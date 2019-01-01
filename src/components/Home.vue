<template>
<el-container class="home">
  <el-header>
    <div class="logo"></div>
    <div class="title">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="logout">
      <span>欢迎光临</span>
      <a href="javascript:;" @click="logout">退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      :default-active="$route.path.slice(1)"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router>
      <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menu.authName}}</span>
        </template>
        <el-menu-item :index="item.path" v-for="item in menu.children" :key="item.id">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: []
    }
  },
  methods: {
    async logout() {
      try {
        await this.$confirm('你确定要退出系统吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.$message.success('退出成功')
        localStorage.removeItem('token')
        this.$router.push('/login')
      } catch (e) {
        this.$message.info('取消退出')
      }
    },
    async getMenuList() {
      let res = await this.axios.get('menus')
      if (res.meta.status === 200) {
        this.menuList = res.data
        // console.log(this.menuList)
      }
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    display: flex;
    .logo {
      width: 180px;
      background-image: url('../assets/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .logout {
      width: 180px;
      text-align: right;
      line-height: 60px;
      font-weight: 700;
      a {
        color: orange;
      }
    }
    .title {
      flex: 1;
      h1 {
        text-align: center;
        line-height: 60px;
        font-size: 30px;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #d4dfe4;
  }
}
</style>
