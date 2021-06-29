<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card>
      <!-- 权限列表区 -->
      <el-table :data="rightsList" border style="width: 100%">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="380"></el-table-column>
            <el-table-column prop="path" label="路径" width="380"></el-table-column>
            <el-table-column label="权限等级">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
                <el-tag v-else type="warning">三级</el-tag>
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
        rightsList:[]
      }
    },
    methods:{
      async getRightsList(){
        const{data:res} = await this.$http.get("rights/list")
        console.log(res.data)
        this.rightsList = res.data
      }
    },
    created(){
      this.getRightsList()
      console.log(1)
    }
}
</script>

<style lang="less" scoped>

</style>