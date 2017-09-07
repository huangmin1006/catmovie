<template>
<div>
	<h1>排片信息</h1>
  <el-select v-model="moviesValue" placeholder="请选择电影" style="width:130px">
    <el-option
      v-for="item in movies"
      :key="item.value"
      :value="item.value">
    </el-option>
    </el-select>  
  <el-select v-model="theaterValue"  placeholder="请选择电影院" style="width:130px">
    <el-option
      v-for="item in theater"
      :key="item.value"
      :value="item.value"           
      >
    </el-option>      
  </el-select>
  <el-select v-model="videoHallValue" placeholder="请选择电影厅" style="width:130px">
    <el-option
      v-for="item in videoHall"
      :key="item.value"
      :value="item.value">
    </el-option>      
  </el-select>
<el-input v-model="priceValue" placeholder="票价" @blur="priceBtn" style="width:60px"></el-input>
<el-time-select
    placeholder="起始时间"
    v-model="startTime"
    :picker-options="{
      start: '08:30',
      step: '00:30',
      end: '23:30'
    }">
  </el-time-select>
  <el-time-select
    placeholder="结束时间"
    v-model="endTime"
    :picker-options="{
      start: '08:30',
      step: '01:30',
      end: '23:30',
      minTime:startTime}">
  </el-time-select>
  <el-button type="primary" :disabled="true" @click="rowPieceAdd" id="rowPieceBtn">提交排片信息</el-button>
  <el-select style="width:180px" v-model="reachTypeValue" placeholder="请选择查询类型">
    <el-option
      v-for="item in reachType"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-input
    size="small"
    placeholder="请输入内容"
    v-model="reachValue"
    @blur="reachBtn" style="width:130px">
    </el-input>
    <el-table
      :data="videoHallTable"
      style="width: 100%">
      <el-table-column
        prop="movies"
        label="电影"
        width="180">
      </el-table-column>
      <el-table-column
        prop="theater"
        label="电影院"
        width="180">
      </el-table-column>
      <el-table-column
        prop="videoHall"
        label="放映厅">
      </el-table-column>
      <el-table-column
        prop="price"
        label="票价">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间">
      </el-table-column>
<el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="upData" type="text" size="small">修改</el-button>
        <el-button type="text" size="small" @click="delData">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>
<script>
	export default {
 data() {
      return {
        movies: [{
          value: '蜘蛛侠归来'
        }, {
          value: '蝙蝠侠归来'
        }, {
          value: '钢铁侠归来'
        }, {
          value: '绿巨人归来'
        }, {
          value: '奥特曼归来'
        }],        
        theater: [{
          value: '蜘蛛侠影院'
        }, {
          value: '蝙蝠侠影院'
        }, {
          value: '钢铁侠影院'
        }, {
          value: '绿巨人影院'
        }, {
          value: '奥特曼影院'
        }],
        videoHall: [{
          value: '蜘蛛侠影厅'
        }, {
          value: '蝙蝠侠影厅'
        }, {
          value: '钢铁侠影厅'
        }, {
          value: '绿巨人影厅'
        }, {
          value: '奥特曼影厅'
        }],
        moviesValue:"",
        videoHallValue:"",
        theaterValue:"",
        priceValue:"",
        startTime: '',
        endTime: '',
        reachType:[{
            label:"电影",
            value:"movies"
        },{
            label:"电影院",
            value:"theater"
        },{
            label:"价格",
            value:"price"
        }],
        reachTypeValue:"",
        reachValue:"",
        videoHallTable: [{
            movies: '遮天',
            theater:"神兽影院",
            videoHall:"青龙放映厅",
            price:"300",
            time:"2016-9-10-8-40"+"到"+"2016-9-10-10-40"
          }, {
            movies: '神墓',
            theater:"神兽影院",
            videoHall:"朱雀放映厅",
            price:"300",
            time:"2016-9-10-8-40"+"到"+"2016-9-10-10-40"
          }, {
            movies: '圣墟',
            theater:"万兽影院",
            videoHall:"欣欣放映厅",
            price:"300",
            time:"2016-9-10-8-40"+"到"+"2016-9-10-10-40"
          }, {
            movies: '神弥',
            theater:"百羽影院",
            videoHall:"神皇放映厅",
            price:"300",
            time:"2016-9-10-8-40"+"到"+"2016-9-10-10-40"
          }]
      }
    },
        methods: {
    //修改中获取第一个选项数据
      upData() {
          
//        console.log(this._data.moviesValue);
      },
    //删除
    delData(){
        console.log(this)
    },
    //查询
    reachBtn(){
        let reachTable=[];
        for(let i of this._data.videoHallTable){
            if(i[this._data.reachTypeValue]==this._data.reachValue){
                reachTable.push(i);
            }
        }
        this._data.videoHallTable=reachTable;
    },
   //添加
    rowPieceAdd(){
        let obj={
            movies:this._data.moviesValue,
            theater:this._data.theaterValue,
            videoHall:this._data.videoHallValue,
            price:this._data.priceValue,
            time:this._data.startTime+"到"+this._data.endTime
        }
        this._data.videoHallTable.push(obj);
       
    },
    priceBtn(){
        
        if(this._data.priceValue==""){
           }else{
               rowPieceBtn.className="el-button el-button--primary";
               rowPieceBtn.disabled=false;

           }
        
    }
    }
}

	
</script>
<style>
/*    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">*/
</style>