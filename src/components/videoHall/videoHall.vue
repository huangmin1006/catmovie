<template>
  <div class="videoHall">
    <el-tabs v-model="editableTabsValue" type="border-card">
      <el-tab-pane label="选择影院">
        <div class="cinemaSel">
          <template>
            <el-table
              :data="cinemaList"
              border
              highlight-current-row
              @cell-mouse-enter="toAddHallState"
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
                width="150">
                <template scope="scope">
                  <el-button type="primary" size="small" @click="addHallBtn">增加影厅</el-button>
                </template>
              </el-table-column>
            </el-table>
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
              :data="hallList"
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
                    @click.native.prevent="deleteRow(scope.$index, hallList)"
                    type="text"
                    size="small"
                    >
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
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
            GET_HALL_LIST,
            ASYNC_ADD_HALL,
            ASYNC_DEL_HALL,
            ASYNC_CINEMAID_GET_HALL_LIST,
            ASYNC_GET_CINEMA_LIST,
          } from "./store"

  export default {


    //第一次更新页面数据
    beforeMount(){
      this[ASYNC_GET_CINEMA_LIST]({});
    },

//    mounted() {
//      console.log(this)
//    },


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
        }
      };
    },

    //函数集合
    methods: {

      ...mapActions("videoHall", [ASYNC_GET_CINEMA_LIST,
                                    ASYNC_DEL_HALL,
                                    GET_HALL_LIST,
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
          console.log(this.videoHall.id);
          this[ASYNC_CINEMAID_GET_HALL_LIST]({id:this.videoHall.id});
        }
      },


      // 移除数据(有BUG，不能调用状态机actions函数)
      async deleteRow() {
        await this.$store.dispatch({
          type: ASYNC_DEL_HALL,
          _id: this.videoHall.id
        })
      },


      //增加放映厅数据
      addHallData(){
          let obj = {
            cinemaID: this.videoHall.id,
            hallName: this.form.name,
            seatLine: this.seatLine,
            seatList: this.seatList
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
      ...mapState("videoHall", ["cinemaList","hallList"]),
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
