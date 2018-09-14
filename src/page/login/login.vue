<template>
  <!--背景图-->
  <div class = "formBackground" >

    <!--login框，表单+tab标签页的组合-->
    <div class = "loginFrame">

      <!--表单组件放在外面，标签栏在里面-->
      <el-form ref = "AccountForm" :data="account"  rules = "rules"  label-width="60px" class = "demo-ruleForm login-container">

        <!--tab标签-->
        <div class="title">
          <span>停车场后台配置管理系统</span>
        </div>

        <div class = "formGroup">
          <el-form-item  label = "账号" prop = "username" v-model="account.username" >
            <el-input type = "text"  auto-complete = "off" v-model="account.username" placeholder = "请输入您的账号" class = "form-control" ></el-input></el-form-item>
          <el-form-item label = "密码" prop = "password" class = "form-inline">
            <el-input type = "password" auto-complete = "off" v-model="account.password" placeholder = "请输入密码" class = "form-control" ></el-input></el-form-item>
        </div>
        <div class = "remFor">
          <el-checkbox v-model = "checked" checked class = "remember">记住密码</el-checkbox>
        </div>

        <div class = "formButton">
          <el-form-item style = "width:100%;">
            <el-button type = "primary" style = "width:100%;" @click="login" >{{ButtonText}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ButtonText: '登录',
      logining: false,
      account: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
          // { validator: validaePass }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
          // { validator: validaePass2 }
        ]
      },
      checked: false

    }
  },
  methods: {
    login () {
      this.ButtonText = '登陆中'
      this.$axios.post(this.HOME + '/user/verify', {
        'password': this.account.password,
        'userName': this.account.username
      }).then(res => {
        console.log(res.data)
        if (res.data.extra.code === 0) {
          this.$message({
            type: 'success',
            message: '登录成功!'
          })
          // 将用户名存入localStorage
          this.$store.commit('$_setStorage', this.account.username)
          this.$router.replace('/manage')
          // this.$goRoute('/manage')
        } else {
          this.$message({
            type: 'error',
            message: res.data.extra.errMsg
          })
        }
      })
        .catch(err => {
          console.log(err)
        })
    }
  }

}</script>

<style>
  .formBackground{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #324057;
  }
  .login-container {
    position: absolute;
    top: 25%;
    left: 35%;
    width: 350px;
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.7);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }
  .title{
    margin-bottom: 20px;
    text-align: center;
  }
  label{
    width:70px;
    text-align:left;

  }

  .formGroup{
    width:270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;

  }
  .remember{
    width:250px;
    text-align:left;

  }
  .remFor{
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

</style>
