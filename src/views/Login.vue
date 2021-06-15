<template>
  <div class="login_container">
      <div class="login_box">
          <!--头像区域-->
        <div class="avater">      
          <img  class="img" src="../assets/images/logo.svg" alt="" />
        </div>
          <!--登录表单区-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">  
            <el-form-item  prop="username">
                <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>         
            <el-form-item prop="password" >
                <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
            </el-form-item>    
            <el-form-item class="btn">
              <el-button type="primary" @click="login" >登录</el-button>
              <el-button @click="resetForm('loginFormRef')">重置</el-button>
            </el-form-item>    
        </el-form>
      </div>
   
  </div>
</template>

<script >

export default {
    name:'Login',
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'
            },
            loginRules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,max:5,message:'长度在3到5个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:6,max:16,message:'长度在6到16个字符',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        resetForm(formName){
            this.$refs[formName].resetFields();
           //console.log(formName)
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid) return ;
                const{data:result} = await this.$http.post('/login',this.loginForm);
              
                if(result.meta.status !==200){
                     //return console.log(this.$message);
                      return this.$message.error({
                        message:'登录失败',
                        duration:1000,
                     });
                }
                //console.log(result.data.token)
               
                //登录成功
                this.$message.success({
                        message:'登录成功',
                        duration:1000,
                     });
                //保存token到sessionStorage中
                window.sessionStorage.setItem('token',result.data.token)
                //跳转到首页
                this.$router.push('/home');
            });
        }
    }
}
</script>

<style lang="less" scoped>
.login_container{
    background: #414172;
    height:100%;
    display: flex;
    justify-content:center;
    align-items: center;
}
.login_box{
    height:300px;
    width:450px;
    background:#eee;
    border-radius:3px;
    position: absolute;
}
.avater{
    background: #eee;
    width:130px;
    height: 130px;
    position: absolute;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 5px;
    border: 1px solid #eee;
    border-radius: 50%;
}
.login_form{
    background: #eee;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
}
.btn{
    display: flex;
    justify-content: flex-end;
}
.img{
    width: 130px;
    height: 130px;
    border-radius: 50%;
}
</style>