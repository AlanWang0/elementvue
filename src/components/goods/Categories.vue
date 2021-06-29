<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="noRights">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 树形数据表格 -->
        <el-table
          :data="cateList"
          style="width: 100%;margin-bottom: 20px;"
          row-key="cat_id"
          border      
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
             <el-table-column
               prop="cat_name"
               label="分类名称"
               sortable
               width="580">
             </el-table-column>
             <el-table-column  
               label="级别"
               sortable>
               <el-tag >一级</el-tag>
             </el-table-column>
        </el-table>
            <!-- <el-tree
              :data="cateList"
              show-checkbox
              node-key="cat_id"
              default-expand-all
              :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node,   cateList  }">
              <span>{{ node.cat_name }}</span>
              <span>{{node}}</span>
              </span>
            </el-tree> -->
    </el-card>

  </div>
</template>

<script>
export default {
 data(){
   return{
      // 商品分类的数据列表，默认为空
      cateList: [],
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1, //页码
        pagesize: 5, //每页显示多少条数据
      },
   }
 },
 methods:{
   async getCateList(){
     const{data:res} = await this.$http.get('/categories')
    //  const { data: res } = await this.$http.get("/categories", {
    //     params: this.queryInfo,
    //  });
     //console.log(res.data)
     this.cateList = res.data
     console.log(this.cateList)
   },
   noRights(){
     this.$message('未获得操作权限');
   }
 },
 created(){
   this.getCateList()
 }
}
</script>

<style>

</style>