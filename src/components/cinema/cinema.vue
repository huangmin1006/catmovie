<template>
  <div class="cinema-main">

    <el-tabs v-model="editableTabsValue" type="border-card">

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
              :data="cinemaRowsList"
              border
              highlight-current-row
              height="300"
              @current-change="handleCurrentChange"
              >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="cinemaName"
                label="影院名"
                show-overflow-tooltip
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
                show-overflow-tooltip
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
                    @click.native.prevent="deleteRow(scope.$index, cinemaRowsList)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

          <!--分页-->
          <template>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="cinemaRowsList.length">
              </el-pagination>
            </div>
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
  import {ASYNC_ADD_CINEMA,ASYNC_ROWS_CINEMA,ASYNC_DEL_CINEMA,ASYNC_GET_CINEMA_LIST} from "./store"
  import {mapActions } from "vuex"


  export default {

//    第一次更新页面数据
    beforeMount(){
//      this[ASYNC_GET_CINEMA_LIST]({});
      this[ASYNC_ROWS_CINEMA]({rows:10});
    },
    computed: {
      ...mapState("cinema", ["cinemaList","cinemaRowsList"])
    },

    data(){
      return{
        currentRow: null,
        editableTabsValue: '0',

        // 增加DIV
        labelPosition: 'right',
        formLabelAlign: {
          cinemaName: '',
          cityName: '',
          address: '',
          telephone: ''
        },

        // 分页
        currentPage: 1,
      }
    },

    methods:{
      ...mapActions("cinema", [ASYNC_ADD_CINEMA,ASYNC_ROWS_CINEMA,ASYNC_DEL_CINEMA,ASYNC_GET_CINEMA_LIST]),

      // 移除数据
      deleteRow(index, rows) {
        this[ASYNC_DEL_CINEMA]({_id:rows[index]._id});
      },



      // 管理选中事件
      handleCurrentChange(val) {
        if(val){
          this.currentRow = val;
        }
      },

      // 取消按钮
      closeCinema(){
        this.formLabelAlign.cinemaName = '';
        this.formLabelAlign.cityName = '';
        this.formLabelAlign.address = '';
        this.formLabelAlign.telephone = '';
      },


      // 增加电影院
      addCinema(){
        this.editableTabsValue = '1';
        let obj = {
          cinemaName: this.formLabelAlign.cinemaName,
          cityName: this.formLabelAlign.cityName,
          address: this.formLabelAlign.address,
          telephone: this.formLabelAlign.telephone
        };
        this[ASYNC_ADD_CINEMA](obj);
//        this[ASYNC_ROWS_CINEMA]();
        this.closeCinema();
      },

      // 分页
      handleSizeChange() {
      },
      handleCurrentChange(val) {
        this[ASYNC_ROWS_CINEMA]({curpage:val})
      }

    }
  }
</script>


<style scoped>
  .el-form-item{
    width: 400px;
  }
</style>
