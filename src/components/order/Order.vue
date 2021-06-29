<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card>
      <!-- 搜索区 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容"  v-model="queryInfo.query"  @keyup.enter.native="getOrderList" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表区 -->
      <el-table :data="orderList" border style="width: 100%">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="order_number" label="订单编号" ></el-table-column>
            <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
            <el-table-column prop="is_send" label="是否发货" width="100"></el-table-column>
            <el-table-column prop="create_time" label="下单时间" width="165px">
              <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" @click="noRights"> 编辑</el-button>
                <el-button type="danger" @click="noRights">删除</el-button>
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

  </div>
</template>

<script>
export default {
 data(){
    return{
        queryInfo:{
          query:'',
          pagenum: 1,
          pagesize: 10
        },
        orderList:[],
        total:0
    }
 },
 methods:{
   async getOrderList(){
     console.log('orderlist')
     const{data:res} = await this.$http.get('/orders',{params:this.queryInfo})
     this.orderList = res.data.goods
     this.total = res.data.total
     console.log(res)
   },
   //每页展示数变化时触发
   handleSizeChange(newPageSize){
     this.queryInfo.pagesize = newPageSize
     this.getOrderList()
   },
   //页数改变时触发
   handleCurrentChange(newPageNumber){
     this.queryInfo.pagenum = newPageNumber
     this.getOrderList()
   },
   noRights(){
        this.$message('未获得操作权限');
   }
 },
 created(){
   this.getOrderList()
   console.log(1)
 }
}
</script>

<style>
.el-table{
  margin-top:15px;
}

</style>