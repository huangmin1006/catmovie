<template>
  <div class="catMain">
    <!--遮罩层-->
    <!--<div class="closeDiv">-->

    <!--</div>-->

    <header>
      <h1>猫眼后台管理系统</h1>
      <span>{{admin}}</span>
      <button @click="toSign">退出</button>
    </header>
    <div class="main">
      <div class="left">
        <el-row class="tac">
          <el-col :span="8">
            <el-menu default-active="0" class="el-menu-vertical-demo">

              <router-link to="/Admin">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  管理员
                </el-menu-item>
              </router-link>

              <router-link to="/user">
                <el-menu-item index="2">
                  <i class="el-icon-star-on"></i>
                  排片信息
                </el-menu-item>
              </router-link>

              <router-link to="/movie">
                <el-menu-item index="3">
                  <i class="el-icon-picture"></i>
                  电影信息
                </el-menu-item>
              </router-link>

              <router-link to="/MovieHall">
                <el-menu-item index="4">
                  <i class="el-icon-more"></i>
                  影厅信息
                </el-menu-item>
              </router-link>

              <router-link to="/theater">
                <el-menu-item index="5">
                  <i class="el-icon-search"></i>
                  影院信息
                </el-menu-item>
              </router-link>

              <router-link to="/news">
                <el-menu-item index="6">
                  <i class="el-icon-date"></i>
                  资讯
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
  import axios from 'axios'

  let getSession = axios.get('http://127.0.0.1:8888/getSession',{});
  console.log(getSession);

  export default {
    name: 'catMain',

    data(){
        return {
            admin: ""
        }
    },

    methods:{
      toSign(){
        this.$router.push('/login');
      }
    },


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

  .left>div>div{
    width: 200px;
  }

  .left li{
    border-bottom: 1px solid #000;
    padding-left: 50px!important;
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
