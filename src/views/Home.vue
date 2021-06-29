<template>

    <el-container class="home-container">
          <!--头部区域-->
          <el-header class="header">
               <div>
                   <img  class="img" src="../assets/images/logo.svg" alt="" />  
                   <span>电商后台管理系统 </span>            
               </div> 
               <el-button type="info" @click="logout">退出</el-button> 
          </el-header> 
          <!--页面主体区--> 
          <el-container> 
                <!--侧边栏--> 
                <el-aside :width=" isCollapse ? '64px' : '200px' " class="aside">    
                    <div class="toggle-button" @click="togglecollapse">|||</div>    
                    <!--侧边栏菜单区--> 
                    <el-menu 
                    background-color="#333744" 
                    text-color="#fff" 
                    active-text-color="#409EFF" 
                    :unique-opened="true" 
                    :collapse = isCollapse 
                    :collapse-transition ="false" 
                    :router="true"
                    >   
                        <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                                <!-- 一级菜单模板区域 -->
                                <template slot="title"> 
                                <!--图标 -->                               
                                <i :class="iconsObj[item.id]"></i>                                                          
                                <!-- 文本 -->
                                <span>{{ item.authName }}</span>
                                </template>
                                <!-- 二级菜单 -->
                                <el-menu-item :index="subItem.path + '' " v-for="subItem in item.children" :key="subItem.id">
                                <template slot="title">
                                    <!--图标-->
                                    <i class="el-icon-menu"></i>                                            
                                    <!-- 文本 -->
                                    <span>{{ subItem.authName }}</span>
                                </template>
                                </el-menu-item>                                   
                        </el-submenu>              
                    </el-menu>
                </el-aside>
                <!--右侧内容主体-->
                <el-main class="main">               
                    <router-view></router-view>
                </el-main>
          </el-container>

    </el-container>


  
</template>

<script>

export default {
    name:'Home',
    data(){
        return{
            menulist:[],
            iconsObj: {
              125: 'iconfont icon-user',
              103: 'iconfont icon-tijikongjian',
              101: 'iconfont icon-shangpin',
              102: 'iconfont icon-danju',
              145: 'iconfont icon-baobiao', 
            },
                  //控制左侧边栏的切换状态
            isCollapse: false,
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        async getMenuList(){
          const{data:res}  = await this.$http.get('/menus')          
          if(res.meta.status !== 200) return this.$message.err(res.meta.msg)
          this.menulist = res.data
          console.log(this.menulist)
        },
        togglecollapse(){
            
            this.isCollapse = !this.isCollapse
            console.log(this.isCollapse)
        }
    }
}
</script>

<style lang="less" scoped>
.home-container{
    height:100%;
}
.header{
    background: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left:0;
    align-items: center;
    color:white;
    font-size:20px;
    >div{
        display: flex;
        align-items: center;
        margin-left:15px;
        >span{
            margin-left:15px;
        }
    }
}
.aside{
    background: #333744;
    .el-menu{
        border-right:none;
    }
   
}
.main{
    background: #eaedf1;
}
.img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color:#4A5064;
    font-size:10px;
    line-height: 24px;
    color:#fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>

