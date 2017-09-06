<template>
  <div class="catMain">
    <div class="left">
      <el-row class="tac">
        <el-col :span="8">
          <el-menu default-active="1" class="el-menu-vertical-demo">

            <router-link to="/Admin">
              <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                去管理员
              </el-menu-item>
            </router-link>

            <router-link to="/user">
              <el-menu-item index="2">
                <i class="el-icon-setting"></i>
                去用户
              </el-menu-item>
            </router-link>

            <router-link to="/movie">
              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                去电影
              </el-menu-item>
            </router-link>

            <router-link to="/coming">
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                去热映
              </el-menu-item>
            </router-link>

            <router-link to="/news">
              <el-menu-item index="5">
                <i class="el-icon-setting"></i>
                去资讯
              </el-menu-item>
            </router-link>

            <router-link to="/hot">
              <el-menu-item index="6">
                <i class="el-icon-setting"></i>
                去热映
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
</template>


<script>
  export default {
    name: 'catMain',
    methods:{
      methods: {
        
      }
    }
  }
</script>

<style scoped>


  a{
    text-decoration: none;
  }


</style>
