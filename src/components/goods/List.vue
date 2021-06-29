<template>
  <div> 
    <!-- 面包屑导航区域 --> 
    <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item> 
        <el-breadcrumb-item>商品管理</el-breadcrumb-item> 
        <el-breadcrumb-item>商品列表</el-breadcrumb-item> 
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="boxcard">
      <!-- 搜索与添加区 -->
      <el-row :gutter="20">
        <el-col :span="7" >
          <el-input  placeholder="请输入内容" v-model="queryInfo.query"  @keyup.enter.native="getGoodsList" clearable @clear="getGoodsList">
            <el-button  slot="append" icon="el-icon-search" @click ="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表区 -->
      <el-table :data="goodsList" border style="width: 100%">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
            <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
            <el-table-column prop="goods_number" label="商品数量" width="100"></el-table-column>
            <el-table-column label="更新时间" prop="add_time" width="165px">
              <template slot-scope="scope">{{scope.row.upd_time | dateFormat}}</template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" @click="showEditDialog(scope.row)"> 编辑</el-button>
                <el-button type="danger" @click="deleteGoodsById(scope.row.goods_id)">删除</el-button>
              </template>
            </el-table-column>                
      </el-table>
      <!-- 分页区 -->
      <el-pagination
      @size-change = "handleSizeChange"
      @current-change = "handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>    
    <!-- 添加商品对话框 -->
      <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="50%" @closed="addDialogClosed">
        <el-form ref="addFormRef" :rules ="addFormRules" :model="addGoods" label-width="80px">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoods.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoods.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="goods_number">
              <el-input v-model="addGoods.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoods.goods_weight"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="addDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="submitNewGoods">确定</el-button>            
            </el-form-item>
        </el-form>
      </el-dialog>
    <!-- 编辑商品的对话框 -->
    <el-dialog title="编辑商品" :visible.sync="editDialogVisible" width="50%" @closed="editDialogClosed">
      <el-form ref="editFormRef" :rules ="editFormRules" :model="editForm" label-width="80px">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="editForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="editForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="goods_number">
              <el-input v-model="editForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="editForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button >取消</el-button>
              <el-button type="primary" @click="editGoodsInfo">确定</el-button>            
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    //debugger
    return{
      //获取商品列表的参试
      queryInfo:{
        query:'',
        //当前的页数
        pagenum:1,
        //当前每页显示多少条数据
        pagesize:10,
      },
      //商品列表数据
      goodsList:[],    
      total:0,
      //控制商品添加对话框的隐藏与显示
      addDialogVisible :false,
      //添加新商品的表单对象
      addGoods:{
        // goods_name:'',
        // goods_cat: '',
        // goods_price:'',
        // goods_number:'',
        // goods_weight:''
         "goods_name":"",
         "goods_cat": "1,2,3",
         "goods_price":'',
         "goods_number":'',
         "goods_weight":'',
       
      },
      //添加商品表单的验证规则
      addFormRules: {
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },          
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            
          ],
          goods_number: [
            { required: true, message: '请输入商品库存', trigger: 'blur' },
            
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
            
          ]
      },
      //编辑商品的表单对象
      editForm:{},
      //编辑商品表单的验证规则
      editFormRules:{
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },          
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            
          ],
          goods_number: [
            { required: true, message: '请输入商品库存', trigger: 'blur' },
            
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
            
          ]
      },
      //控制商品编辑对话框的隐藏与显示
      editDialogVisible:false
    }
  },
  methods:{
    
    async getGoodsList(){
      const{data:res} = await this.$http.get('/goods', {
        params: this.queryInfo,
      })
      console.log(res)
      this.goodsList = res.data.goods
      console.log(this.goodsList)
      this.total = res.data.total
      console.log(this.total)
    },
    //每页显示条数改变时触发
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    //页码改变时触发
    handleCurrentChange(newpage){
      this.queryInfo.pagenum = newpage
      this.getGoodsList()
    },
    //提交新增商品
    submitNewGoods(){
      this.$refs.addFormRef.validate(async(valid) =>{
        if(!valid){
          return this.$message.error({
            message:'error'
          })
        }
        const {data:res} = await this.$http.post('/goods',this.addGoods)
        console.log(res)
        this.$message.success('添加成功')
        this.addDialogVisible=false
        this.getGoodsList()  
      })
    },
    //清空添加商品对话框数据
    addDialogClosed(){
      console.log(1)
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    //显示商品编辑对话框
    async showEditDialog(goodsInfo){
     // console.log(goodsInfo)
      const { data: res} = await this.$http.get('goods/'+goodsInfo.goods_id)
      console.log(this.editForm)
      this.editForm = res.data   
      this.editDialogVisible = true
    },
    //编辑商品信息
    editGoodsInfo(){
      console.log('editgoods')
      this.$refs.editFormRef.validate(async valid=>{
        if(!valid){
          return this.$message.error({
            message:'添加失败',
            duration:1000          
          })
        }
        console.log(this.editForm)
       const {data:res} = await this.$http.put('goods/'+this.editForm.goods_id,this.editForm)
        console.log(res)
        this.$message.success('修改成功')
        this.editDialogVisible=false
        this.getGoodsList()  
      })
    },
    //清空商品编辑对话框的数据
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
      this.editDialogVisible = false
    },
    //删除商品
    async deleteGoodsById(id){
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
       console.log(id)
       const { data: res } = await this.$http.delete(`goods/${id}` )
       console.log(res)
       if (res.meta.status !== 200) {
         return this.$message.error({
           message:'无删除权限',
           duration: 1500,
         })
       }

       this.$message.success({
         message: '删除成功!',
         duration: 1500,
       })
       // 更新数据列表
       this.getGoodsList()
    }
    
  },

  mounted (){
    //debugger
    console.log('b')
  },
  created (){
    //debugger
    
    console.log('a')
    this.getGoodsList()
  }

}
</script>

<style lang="less" scoped>
.boxcard{
  margin:20px;
}
.el-table{
  margin-top:20px;
}
</style>