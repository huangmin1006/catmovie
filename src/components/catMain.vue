<template>
  <div class="catMain">
    <header>
      <h1>猫眼后台管理系统</h1>
      <span>用户名</span>
      <button @click="toSign">退出</button>
    </header>
    <div class="main">
      <div class="left">
        <el-row class="tac">
          <el-col :span="8">
            <el-menu default-active="1" class="el-menu-vertical-demo">

              <router-link to="/Admin">
                <el-menu-item index="1">
                  <i class="el-icon-setting"></i>
                  管理员
                </el-menu-item>
              </router-link>

              <router-link to="/user">
                <el-menu-item index="2">
                  <i class="el-icon-setting"></i>
                  用户
                </el-menu-item>
              </router-link>

              <router-link to="/movie">
                <el-menu-item index="3">
                  <i class="el-icon-setting"></i>
                  电影
                </el-menu-item>
              </router-link>

              <router-link to="/coming">
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  即将上映
                </el-menu-item>
              </router-link>

              <router-link to="/theater">
                <el-menu-item index="5">
                  <i class="el-icon-setting"></i>
                  院线管理
                </el-menu-item>
              </router-link>

              <router-link to="/news">
                <el-menu-item index="6">
                  <i class="el-icon-setting"></i>
                  资讯
                </el-menu-item>
              </router-link>

              <router-link to="/hot">
                <el-menu-item index="7">
                  <i class="el-icon-setting"></i>
                  热映
                </el-menu-item>
              </router-link>

            </el-menu>
          </el-col>
        </el-row>
      </div>

      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'catMain',
    methods:{
      toSign(){
        this.$router.push('/Sign');
      }
    }
  }
</script>

<style scoped>

  .main{
    display: flex;
  }

  .catMain>header{
    background: linear-gradient(lightsteelblue, lightcyan, gainsboro, paleturquoise); /* 标准的语法 */
    display: flex;
    align-items: center;
  }

  header>button{
    margin: 0 30px 0 25px;
  }

  .catMain>header>h1{
    flex: 1;
    font-style: italic;
    margin: 30px 0 50px 50px;
  }

  .left{
    text-align: center;
  }

  .left>div>div{
    width: 200px;
  }

  a{
    text-decoration: none;
  }


</style>
