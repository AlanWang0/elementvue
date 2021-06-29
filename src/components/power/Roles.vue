<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
        <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="noRights">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区 -->
      <el-table :data="rolesList" border style="width: 100%">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="280"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" ></el-table-column>
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <el-button type="primary" @click="noRights"> 编辑</el-button>
                <el-button type="danger" @click="noRights">删除</el-button>
                <el-button type="warning" @click="noRights" >分配权限</el-button>
              </template>
            </el-table-column>                
      </el-table>
    </el-card>
    
  </div>
</template>

<script>
export default {
    data(){
      return{
        rolesList:[]    
      }
    },
    methods:{
      async getRolesList(){
        const{data:res} = await this.$http.get('/roles')
        console.log(res)
        this.rolesList = res.data
      },
      noRights(){
        this.$message('未获得操作权限');
      }
    },
    created(){
      this.getRolesList()
    }
}
</script>

<style>

</style>