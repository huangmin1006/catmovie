<template>
    <div class="movieMsg">
    <div class="movieMsgs">
<!--    选择电影-->
    <div>
        <span>电 影 :</span>
    <el-select class="select"  @change="movies_change" v-model="movies_value" placeholder="请选择电影">
        <el-option
          v-for="item in movies"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
  </el-select>
<!--  选择影院-->
  <span class="txt">影 院 :</span>
   <el-select class="select" @change="cinema_change" v-model="cinema_value" placeholder="请选择影院">
        <el-option
          v-for="item in cinema"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
  </el-select>
    </div>
<!--    选择影厅-->
  <span>影 厅 :</span>
   <el-select class="select" @change="movieHall_change" v-model="movieHall_value" placeholder="请选择影厅">
        <el-option
          v-for="item in movieHall"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
  </el-select>
<!--  选择时间-->
  <span>时 间 :</span>
   <el-date-picker
    class="select"
     format="yyyy-MM-dd HH:mm:ss"
      v-model="time_value"
      type="datetime"
      @change="pickTime"
       :picker-options="pickerOptions0"
      placeholder="选择日期时间">
    </el-date-picker>
<!--    选择票价-->
  <span>票 价 :</span>
   <el-input class="select" style="width:60px" v-model="num1" ></el-input>
      <el-button class="select" @click="btnclick" type="primary">提交排片信息</el-button>
<!--      全部电影-->
       <div>
            <el-table 
                :data="movieMsg.movieMsg_movie_tab.rows"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="电影名"
                  class="txt">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="片长">
                </el-table-column>
                <el-table-column
                  prop="date1"
                  label="上映时间">
                </el-table-column>
                <el-table-column
                  prop="people"
                  label="票房">
                </el-table-column>
                 <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">放映位置</el-button>
                  </template>
</el-table-column>
</el-table>
</div>
<!--分页组件-->
<div class="block">
    <el-pagination class="pagination" layout="prev, pager, next" @current-change="tabchange" :page-size="movieMsg.movieMsg_movie_tab.eachpage" :total=movieMsg.movieMsg_movie_tab.total>
    </el-pagination>
</div>
<!--电影放映情况表-->
<el-table  :data="movieMsg.movieMsg_add" style="width: 100%">
    <el-table-column prop="movies_name" label="电影名">
    </el-table-column>
    <el-table-column prop="cinema_name" label="上映影院">
    </el-table-column>
    <el-table-column prop="movieHall_name" label="放映厅">
    </el-table-column>
    <el-table-column prop="time" label="放映时间">
    </el-table-column>
    <el-table-column prop="num1" label="票价">
    </el-table-column>
    <el-table-column label="操作">
        <template scope="scope">
    <el-popover ref="popover{{$index}}" placement="left" style="width: 900px;height: 900px">
      <div class="allseat"  v-for="(item,index) in movieMsg.movieMsg_seat">
                <div   v-for="(num,index) in JSON.parse(item)" class="seat">
                    
                </div>
            </div>
    </el-popover>
    <el-button size="small" @click="mate_seat(scope.row)" type="danger" v-popover:popover{{$index}}>座位</el-button>
  </template>
    </el-table-column>
</el-table>
</div>
</div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                movieHall_name: '',
                cinema_name: '',
                movies_name: '',
                movies: [],
                cinema: [],
                movieHall: [],
                time: [],
                movies_value: null,
                cinema_value: null,
                movieHall_value: null,
                time_value: null,
                num1: "",
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        computed: mapState([
            "movieMsg"
        ]),
        async beforeMount() {
            await this.$store.dispatch({
                type: 'movieMsg_movies',
            })
            await this.$store.dispatch({
                type: 'movieMsg_movie_tab',
                page: 0
            })
            await this.$store.dispatch({
                type: 'movieMsg_data',
                page: 0
            })            
            var { movieMsg_movie } = this.movieMsg
            
            movieMsg_movie.map((obj) => {
                this._data.movies.push({
                    label: obj.name,
                    value: obj._id,
                    seting:obj.seting
                })
            })
        },
        methods: {
//            座位情况
            async mate_seat(row) {
                console.log("座位传参前",row)
                await this.$store.dispatch({
                    type: 'movieMsg_seat',
                    id: row._id
                })
            },
//            设置时间
            pickTime(e) {
                this._data.time_value = e
            },
//            发起排片提交
            async btnclick() {
                if (this._data.movies_value && this._data.cinema_value && this._data.movieHall_value && this._data.time_value) {
                    await this.$store.dispatch({
                        type: 'movieMsg_add',
                        name: this._data.movies_value,
                        cinema: this._data.cinema_value,
                        movieHall: this._data.movieHall_value,
                        time: this._data.time_value,
                        num1: this._data.num1,
                        movieHall_name: this._data.movieHall_name,
                        cinema_name: this._data.cinema_name,
                        movies_name: this._data.movies_name
                    })
                }
                this._data.cinema = []
                this._data.movieHall = []
                this._data.time = []
                this._data.movies_value = null
                this._data.cinema_value = null
                this._data.movieHall_value = null
                this._data.time_value = null
                this._data.num1 =""
                          
            },
//            查看放映情况
            async handleEdit(i, row) {
                await this.$store.dispatch({
                    type: 'movieMsg_data',
                    id: row._id
                })
            },
//            分页函数
            async tabchange(currentPage) {
                await this.$store.dispatch({
                    type: 'movieMsg_movie_tab',
                    page: currentPage
                })
            },
//            选择电影函数
            async movies_change(id) {
                this._data.cinema = []
                this._data.movieHall = []
                if (id) {
                    this._data.movies_name = this.movieMsg.movieMsg_movie.filter((item) => {
                        return item._id == id
                    })[0].name
                }
                await this.$store.dispatch({
                    type: 'movieMsg_cinema',
                })
                this._data.cinema = []
                var { movieMsg_cinema } = this.movieMsg
                movieMsg_cinema.map((obj) => {
                    this._data.cinema.push({
                        label: obj.cinemaName,
                        value: obj._id
                    })
                })
            },
//            选择影院函数
            async cinema_change(id) {
                this._data.movieHall = []
                if (id) {
                    this._data.cinema_name = this.movieMsg.movieMsg_cinema.filter((item) => {
                        return item._id == id
                    })[0].cinemaName
                }
                await this.$store.dispatch({
                    type: 'movieMsg_movieHall',
                    cinema: this._data.cinema_value
                })
                this._data.movieHall = []
                var { movieMsg_movieHall } = this.movieMsg
                movieMsg_movieHall.map((obj) => {
                    this._data.movieHall.push({
                        label: obj.hallName,
                        value: obj._id
                    })
                })
            },
//            选择影厅函数
            async movieHall_change(id) {
                if (id) {
                    this._data.movieHall_name = this.movieMsg.movieMsg_movieHall.filter((item) => {
                        return item._id == id
                    })[0].hall
                }

            }
        }

    }

</script>

<style scoped>
    .allseat {
        height: 30px;
        width: 300px;
    }
    .seat {
        width: 20px;
        height: 20px;
        background-color:dimgray;
        display: inline-block;
        margin: 5px;
    }
    .movieMsg {
        padding: 20px;
        height: 100%;
        background-color:white;
    }
    .block {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: 20px 0;
    }
    .select {
        margin: 10px;
    
    }
    .movieMsgs {
        padding: 40px;
        background-color: #F2F2F2;
    }
</style>
