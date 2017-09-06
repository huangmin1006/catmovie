<template>
  <div class="catMain">
    <!--遮罩层-->
    <!--<div class="closeDiv">-->

    <!--</div>-->

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
                  管理员
                </el-menu-item>
              </router-link>

              <router-link to="/user">
                <el-menu-item index="2">
                  用户
                </el-menu-item>
              </router-link>

              <router-link to="/movie">
                <el-menu-item index="3">
                  电影
                </el-menu-item>
              </router-link>

              <router-link to="/coming">
                <el-menu-item index="4">
                  即将上映
                </el-menu-item>
              </router-link>

              <router-link to="/theater">
                <el-menu-item index="5">
                  院线管理
                </el-menu-item>
              </router-link>

              <router-link to="/news">
                <el-menu-item index="6">
                  资讯
                </el-menu-item>
              </router-link>

              <router-link to="/hot">
                <el-menu-item index="7">
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



  /*遮罩层*/
  /*.closeDiv{*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/

  body{
    margin: 0;
    padding: 0;
  }

  .catMain{
    width: 100%;
  }

  .main{
    display: flex;
  }

  .catMain>header{
    background: linear-gradient(#179487, #24b5a6, #44bdb0, #69dcd0);
    display: flex;
    align-items: center;
    border-bottom: 5px solid darkgrey;
  }

  header>button{
    margin: 0 30px 0 25px;
    color: #e5435e;
    cursor: pointer;
    border: none;
    font-size: 18px;
    box-sizing: border-box;
    background: transparent;
  }

  header>button:hover{
    text-decoration: underline;
  }

  header>span{
    color: black;
  }

  .catMain>header>h1{
    flex: 1;
    color: #d4e9e7;
    font-style: italic;
    margin: 30px 0 50px 50px;
  }

  .left{
    text-align: center;
  }

  .left>div>div{
    width: 200px;
  }

  .left li{
    border-bottom: 1px solid #000;
  }

  .right{
    width: 100%;
    background: linear-gradient(lightsteelblue, lightcyan, gainsboro, paleturquoise); /* 标准的语法 */
    background-size: 100% 100%;
  }
  a{
    text-decoration: none;
  }


</style>
