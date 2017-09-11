<template>
  <div class="videoHall">
    <el-tabs v-model="editableTabsValue" type="border-card">
      <el-tab-pane label="选择影院">
        <div class="cinemaSel">
          <template>
            <el-table
              :data="cinemaRowsList"
              border
              highlight-current-row
              height="300"
              @cell-mouse-enter="toAddHallState"
            >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="cinemaName"
                label="影院名"
                width="200"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="cityName"
                label="影院城市"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="280"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="电话"
                width="150">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150">
                <template scope="scope">
                  <el-button type="primary" size="small" @click="addHallBtn">增加影厅</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="cinemaRowsList.length">
            </el-pagination>
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="增加影厅">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="影厅名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addHallData">立即增加</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <div class="hallList">
          <template>
            <el-table
              :data="hallRowsList"
              border
              highlight-current-row
              @cell-mouse-enter="selHallList"
            >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="hallName"
                label="影厅名"
                width="150">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, hallRowsList)"
                    type="text"
                    size="small"
                    >
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              @size-change="hallSizeChange"
              @current-change="hallCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="hallRowsList.length">
            </el-pagination>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>

  import axios from "axios"
  import {mapState,mapActions} from "vuex"
  import {

            ASYNC_ROWS_CINEMA,
            ASYNC_ROWS_HALL,
            ASYNC_ADD_HALL,
            ASYNC_DEL_HALL,
            ASYNC_CINEMAID_GET_HALL_LIST,
            ASYNC_GET_CINEMA_LIST,
          } from "./store"

  export default {


    //第一次更新页面数据
    beforeMount(){
      this[ASYNC_ROWS_CINEMA]({rows:10});
    },


    data() {
      return {
        editableTabsValue: '0',
        currentRow: null,
        labelPosition: 'right',

        videoHall: {
          id: "",
        },

        seatLine: 1,
        seatList: 1,
        form:{
          name:''
        },

        // 分页
        currentPage: 1,
      };
    },

    //函数集合
    methods: {
      ...mapActions("videoHall", [ASYNC_GET_CINEMA_LIST,
                                    ASYNC_DEL_HALL,
                                    ASYNC_ROWS_CINEMA,
                                    ASYNC_ROWS_HALL,
                                    ASYNC_CINEMAID_GET_HALL_LIST,
                                    ASYNC_ADD_HALL]),

      //管理选中事件
      toAddHallState(val) {
        this.currentRow = val;
      },


      // 增加放映厅按钮,并刷新当前影院的放映厅
      // (根据选中影院的ID，去匹配影厅里面添加的影院ID)
      addHallBtn(){
        if(this.currentRow._id){
          this.editableTabsValue = "1";
          this.videoHall.id = this.currentRow._id;
          this[ASYNC_CINEMAID_GET_HALL_LIST]({_id:this.videoHall.id});
        }
      },


      // 影院分页
      handleSizeChange() {

      },
      handleCurrentChange(val) {
        this[ASYNC_ROWS_CINEMA]({page:val})
      },


      // 影厅分页
      hallSizeChange() {

      },
      hallCurrentChange(val) {
        this[ASYNC_ROWS_HALL]({page:val})
      },


      // 移除数据(有BUG，命名空间actions函数)
      deleteRow(index, rows) {
        this[ASYNC_DEL_HALL]({_id:rows[index]._id,cinemaID:rows[index].cinemaID})
      },


      //立即增加按钮  增加 → 影厅数据
      addHallData(){
        let obj = {
          cinemaID: this.videoHall.id,
          hallName: this.form.name,
          seatLine: this.seatLine,
          seatList: this.seatList,
        };
        this[ASYNC_ADD_HALL](obj);
      },


      // 用户鼠标的hover事件
      async selHallList(val){
//        this.videoHall.id = val._id;
//        await this.renderHtml();
      }

    },


    // 计算属性
    computed: {
      ...mapState("videoHall", ["hallRowsList","cinemaRowsList"]),
    }
  };
</script>


<style scoped>
  .el-form-item{
    width: 400px;
  }

  .el-form{
    display: flex;
  }
</style>
