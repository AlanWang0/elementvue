<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-alert title="未授权" type="info" effect="dark" show-icon :closable="false">
      </el-alert>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.el-card{
  height: 600px;
  //background: red;
}
.el-alert{
 height: 100px;
}
</style>