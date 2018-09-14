<template>
  <div style="background-color: #f4f8f4;min-height:900px">
    <div>
      <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <div style="background-color: #324057;min-height:900px" >
            <el-menu
              default-active="home"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              background-color="#324057"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
              <el-menu-item index="1"><i class="el-icon-document"></i>停车场信息管理</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-plus"></i>添加停车场信息</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20">
          <div>
            <div style="padding:5px; margin:0px; background-color:white;height: 40px">
              <el-dropdown trigger="click" @command="handleCommand"  menu-align='start' style="float: right">
                                <span class="el-dropdown-link" style="color:#000000">
                                    {{userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                <el-dropdown-menu  slot="dropdown">
                  <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                  <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
             <el-breadcrumb separator="/">
                <el-breadcrumb-item  v-for="item in breadcrumbItems" :key="item">{{item}}</el-breadcrumb-item>
             </el-breadcrumb>
            </div>
          </div>
          <div style="margin-top:10px">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import store from '@/vuex/store'

export default {
  data () {
    return {
      breadcrumbItems: ['停车场信息管理']
    }
  },
  computed: {
    userName () {
      return this.$store.getters.getStorage
    }
  },

  methods: {
    async handleCommand (command) {
      if (command === 'loginout') {
        console.log('点击退出')
        this.$store.commit('$_removeStorage')
        this.$router.push('/')
      } else if (command === 'userInfo') {

      }
    },
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push('/parklist')
          this.breadcrumbItems = ['停车场信息管理']
          break
        case '2':
          this.$router.push('/addpark')
          this.breadcrumbItems = ['添加停车场信息']
          break
        case 'home':
          this.$router.push('/home')
          this.breadcrumbItems = ['首页']
          break
      }
    }
  }

}
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 40px;
  }

  .el-aside {
    color: #333;
  }
</style>
