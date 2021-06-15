<template> 
  <div> 
    <!-- 面包屑导航区域 --> 
    <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item> 
        <el-breadcrumb-item>用户管理</el-breadcrumb-item> 
        <el-breadcrumb-item>用户列表</el-breadcrumb-item> 
    </el-breadcrumb> 
    <!-- 卡片视图区 --> 
    <el-card id="boxacard">  
        <!-- 搜素与添加区 -->              
        <el-row :gutter="20"> 
          <el-col :span="7"> 
                <el-input 
                placeholder="请输入_内容" 
                v-model="queryInfo.query" 
                clearable 
                @clear="getUserList"> 
                <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>     
          </el-col> 
          <el-col :span="4"> 
                <el-button type="primary" @click="adddialogVisible=true">添加用户</el-button>
          </el-col>
        </el-row>   
        <!--用户列表区 -->
        <el-table :data="userList"  :border="true" :stripe="true" style="width: 100%">         
            <el-table-column  label="#" type="index"></el-table-column>
            <el-table-column  label="用户名" prop="username"></el-table-column>
            <el-table-column  label="邮箱" prop="email"></el-table-column>
            <el-table-column  label="电话" prop="mobile"></el-table-column>
            <el-table-column  label="角色" prop="role_name"></el-table-column>
            <el-table-column  label="状态" >
                <template slot-scope="scope">                  
                    <el-switch
                      v-model="scope.row.mg_state"
                      active-color="#409EFF"
                      inactive-color="#DCDFE6"
                      @change="userStateChanged(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column  label="操作"  width="180px">
                <template slot-scope="scope">                  
                  <el-button size="mini" round type="primary"
                   icon="el-icon-edit" v-model="scope.row"
                   @click="showEditDialog(scope.row)">
                  </el-button>
                  <el-button size="mini" round type="danger" 
                    icon="el-icon-delete" @click="removeUserById(scope.row.id)">
                  </el-button>                
                  <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                       <el-button size="mini" round type="warning" icon="el-icon-setting"></el-button>
                  </el-tooltip>
                </template>
            </el-table-column>     
        </el-table>
        <!-- 分页区域 -->
        <!-- 
        size-change 每页显示多少发生变化
        current-change 页码发生变化 
        current-page 当前显示的是第几页
        layout 需要展示的功能组件
        -->
        <el-pagination 
          @size-change="handleSizeChange" 
          @current-change ="handleCurrentChange"   
          :page-sizes="[2, 4, 6, 8]"
          :page-size="queryInfo.pagesize"
          :current-page="queryInfo.pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-card> 
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户" :visible.sync="adddialogVisible" 
      width="40%" @closed="addDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>          
        </el-form-item>
         <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
        </el-form-item>
         <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog  title="修改用户信息" :visible.sync="editDialogVisible" width="40%"  @closed="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div> 
</template> 

<script> 
export default { 
    data(){
            // 验证手机号码的规则
            let checkMobile = (rule, value, callback) => {
              const RegExpMobile = /^[1]([3-9])[0-9]{9}$/
              if (RegExpMobile.test(value)) {
                return callback()
              }
              callback(new Error('请输入中国大陆11位手机号码'))
            }
            return{
            //获取用户列表的参数对象
            queryInfo:{
                query:'',
                //当前的页数
                pagenum:1,
                //当前每页显示多少条数据
                pagesize:10,
            },
            userList:[],
            total:0,
            //控制添加用户对话框的显示与隐藏
            adddialogVisible:false,
            //添加用户的表单数据
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            //添加用户表单验证规则
            addRules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type:'email', message: '请输入正确邮箱', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator:checkMobile , message: '请输入正确手机号', trigger: 'blur' }
                ]
            },
            //修改(edit)用户信息的表单数据
            editForm:{},
            //控制修改用户信息对话框的显示与隐藏
            editDialogVisible:false,
            //修改用户信息的验证规则
            editFormRules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type:'email', message: '请输入正确邮箱', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator:checkMobile , message: '请输入正确手机号', trigger: 'blur' }
                ]                
            }
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
            
            const{data:res} = await this.$http.get('/users',{
               params:this.queryInfo
            });
            if(res.meta.status !==200) return this.$message.error('获取用户列表失败')       
            this.userList = res.data.users
            this.total = res.data.total
             //console.log(this.userList)           
        },
        //监听pagesize改变的事件
        handleSizeChange(newSize){
            console.log(newSize)
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage){
            console.log(newPage)
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        //监听switch变化
        async userStateChanged(userInfo){
            console.log(userInfo)         
            const { data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            if(res.meta.status !== 200){
                userInfo.mg_state = !userInfo.mg_state
                return this.$message.error('更新用户状态失败！')
            }
            this.$message.success('更新用户状态成功')
        },
        addUser(){ 
             this.$refs.addFormRef.validate(async valid=>{
                 if(!valid)return;
                 let {data:res} = await this.$http.post('/users',this.addForm)
                 console.log(this.addForm)
                 console.log(res)
                 if(res.meta.status !==201){
                     return this.$message.error({
                         message:'添加失败',
                         duration:1000,
                     })
                 }
                 this.$message.success({
                     message:'添加成功',
                     duration:1000,
                 })
                 //隐藏添加用户的对话框
                 this.adddialogVisible=false
                 //重新获取用户列表
                 this.getUserList()
                 
             })            
        },
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()           
        },
        //显示编辑用户对话框
        showEditDialog(params){
            //console.log(params)
            this.editForm = params
            this.editDialogVisible = !this.editDialogVisible
        },

        editUserInfo() {
            this.$refs.editFormRef.validate(async (valid, field) => {
            // 有未校验通过的字段
            if (!valid) {
              let arr = Object.keys(field)
              return this.$message.error({
                message: field[arr[0]][0].message,
                duration: 1500,
              })
            }

            const { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
              email: this.editForm.email,
              mobile: this.editForm.mobile,
            })
            console.log(res)

            // 修改失败
            if (res.meta.status !== 200) {
              return this.$message.error({
                message: res.meta.msg,
                duration: 1500,
              })
            }

            this.$message.success({
              message: '修改用户数据成功',
              duration: 1500,
            })
            // 隐藏对话框
            this.editDialogVisible = !this.editDialogVisible
            // 更新数据列表
            this.getUserList()
            })
        },
        editDialogClosed(){
            this.$refs.editFormRef.resetFields()
        },
        async removeUserById(id){
                 // cancel confirm
             const result = await this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning',
             }).catch(err => err)

             //取消删除
             if (result === 'cancel') {
               return this.$message.info({
                 message: '已取消删除',
                 duration: 1500,
               })
             }

             const { data: res } = await this.$http.delete('users/' + id)
             // 删除失败
             if (res.meta.status !== 200) {
               return this.$message.error({
                 message: field[arr[0]][0].message,
                 duration: 1500,
               })
             }

             this.$message.success({
               message: '删除成功!',
               duration: 1500,
             })
             // 更新数据列表
             this.getUserList()
        }
       
    }
} 
</script> 

<style lang="less" scoped>
#boxacard{ 
    margin:20px; 
    
} 
.el-table{
    margin-top: 15px;
}

</style>> 










