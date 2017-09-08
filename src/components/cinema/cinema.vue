<template>
  <div class="cinema-main">

    <el-tabs type="border-card">

      <el-tab-pane label="增加影院">
        <div class="cinemaAdd">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="影院名称">
              <el-input v-model="formLabelAlign.cinemaName"></el-input>
            </el-form-item>
            <el-form-item label="影院城市">
              <el-input v-model="formLabelAlign.cityName"></el-input>
            </el-form-item>
            <el-form-item label="影院地址">
              <el-input v-model="formLabelAlign.address"></el-input>
            </el-form-item>
            <el-form-item label="影院电话">
              <el-input v-model="formLabelAlign.telephone"></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="addCinema">增加</el-button>
            <el-button type="primary" size="small" @click="closeCinema">取消</el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询影院">
        <div class="cinemaSel">
          <template>
            <el-table
              :data="tableList"
              border
              highlight-current-row
              @current-change="handleCurrentChange"
              >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="cinemaName"
                label="影院名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="cityName"
                label="影院城市"
                width="150">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="250">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="电话"
                width="150">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableList)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改影院">
          <div class="cinemaAdd">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="影院名称">
                <el-input v-model="formLabelAlign.cinemaName"></el-input>
              </el-form-item>
              <el-form-item label="影院城市">
                <el-input v-model="formLabelAlign.cityName"></el-input>
              </el-form-item>
              <el-form-item label="影院地址">
                <el-input v-model="formLabelAlign.address"></el-input>
              </el-form-item>
              <el-form-item label="影院电话">
                <el-input v-model="formLabelAlign.telephone"></el-input>
              </el-form-item>
              <el-button type="primary" size="small" @click="addCinema">增加</el-button>
              <el-button type="primary" size="small" @click="closeCinema">取消</el-button>
            </el-form>
          </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import axios from "axios"
  import {mapState} from "vuex"
  import {ASYNC_ADD_CINEMA,ASYNC_GET_CINEMA_LIST} from "./store"
  import {mapActions } from "vuex"


  export default {

//    第一次更新页面数据
    beforeMount(){
      this[ASYNC_GET_CINEMA_LIST]({});
    },
    computed: {
      ...mapState("cinema", ["tableList"])
    },

    data(){
      return{
        currentRow: null,
        editableTabsValue: '0',

//        增加DIV
        labelPosition: 'right',
        formLabelAlign: {
          cinemaName: '',
          cityName: '',
          address: '',
          telephone: ''
        },
      }
    },

    methods:{
      ...mapActions("cinema", [ASYNC_ADD_CINEMA,ASYNC_GET_CINEMA_LIST]),

//      移除数据
      async deleteRow(index, rows) {
        await axios.get("http://localhost:8888/cinema/del",{
          params: {
            _id:rows[index]._id
          }
        });
        this.$store.dispatch(this[ASYNC_GET_CINEMA_LIST]({
          _id:rows[index]._id
        }));
      },



//      管理选中事件
      handleCurrentChange(val) {
        if(val){
          this.currentRow = val;
        }
        console.log("选中")
      },

      //      取消按钮
      closeCinema(){
        this.formLabelAlign.cinemaName = '';
        this.formLabelAlign.cityName = '';
        this.formLabelAlign.address = '';
        this.formLabelAlign.telephone = '';
      },


//      增加电影院
      addCinema(){
        let obj = {
          cinemaName: this.formLabelAlign.cinemaName,
          cityName: this.formLabelAlign.cityName,
          address: this.formLabelAlign.address,
          telephone: this.formLabelAlign.telephone
        };
        this[ASYNC_ADD_CINEMA](obj);
        this.editableTabsValue = '1';
//        closeCinema();
      },

    }
  }
</script>


<style scoped>
  .el-form-item{
    width: 400px;
  }
</style>
