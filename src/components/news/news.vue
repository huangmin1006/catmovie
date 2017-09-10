<template>
	<div class="mainBox">
		<div>
			<el-button type="info" @click="add"><i class="el-icon-plus"></i> 新增咨询</el-button>
		<!-- 	<el-button type="info" @click="del"><i class="el-icon-delete"></i> 移除咨询</el-button> -->
		</div>
		<div v-if="addShow" class="div">
			<form>
				<div class="title">
					<label style="width: 50px">标题:</label>&nbsp;&nbsp;
					<el-input v-model="titleInput" placeholder="标题"></el-input>
				</div>
				<div class="time">
					<label style="width: 50px">时间:</label>
						<el-date-picker
					      v-model="value1"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
			    		</el-date-picker>
				</div>
				<div class="photo">
					<label style="width: 50px">配图:</label>&nbsp;&nbsp;
					<el-upload
					  class="upload-demo"
					  action="http://localhost:8888/news/add"
					  :on-change="handleChange"
					  :file-list="fileList3">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
				<div class="text">
					<label style="width: 50px">文段:</label>&nbsp;&nbsp;
					<el-input v-model="textInput" placeholder="文段"></el-input>
				</div>
				<div class="comment">
					<label style="width: 50px">评论:</label>&nbsp;&nbsp;
					<el-input
					  type="textarea"
					  :rows="2"
					  resize:none
					  placeholder="请输入内容"
					  v-model="textarea">
					</el-input>
				</div>
				<div class="btn">
					<el-button type="info" @click="save"><i class="el-icon-document"></i> 保存咨询</el-button>
					<el-button type="info" native-type="reset" ><i class="el-icon-close"></i> 清空所有</el-button>
					<el-button type="info" @click="back"><i class="el-icon-d-arrow-left"></i> 返回咨询</el-button>
				</div>
			</form>
		</div>
		<div class="infoBox" v-else='infom' >
			<el-table
				ref="multipleTable"
			    :data="tableData3"
			    border
			    style="width: 100%"
			    height="350"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      fixed
			      type="selection"
			      column-key
			      width="50">
			    </el-table-column>
			    <el-table-column
			      fixed
			      prop="title"
			      label="标题"
			      width="150"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="time"
			      label="时间"
			      width="150"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="photo"
			      label="配图"
			      width="180"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="text"
			      label="文段"
			      width="230"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="comment"
			      label="评论"
			      width="200"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column label="操作" fixed="right" width="170px">
				      <template scope="scope">
				       <!--  <el-button
				          size="small"
				          @click.native.prevent="editRow(scope.$index, tableData3)">编辑
				        </el-button> -->
				        <el-button
				          @click.native.prevent="deleteRow(scope.$index, tableData3)"
				          type="danger"
				          size="small">移除
				        </el-button>
				      </template>
    			</el-table-column>		
			</el-table>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapState,mapActions} from 'vuex'
import {
	Get_NEWS_LIST,
	ASYNC_ADD_NEWS,
	ASYNC_GET_NEWS
} from "./store"


	export default {
		beforeMount(){
			this[ASYNC_GET_NEWS]({})
		},
		computed:{
			...mapState('news',["tableData3"])
		},
		data() {
	      return {
	      	pickerOptions0: {
	          disabledDate(time) {
	            return time.getTime() < Date.now() - 8.64e7;
	          }
	        },
	        multipleSelection: [],
	        titleInput:'',
	        value1:'',
	        photoName:'',
	        fileList3: [{
	          name: 'example.jpeg',
	          url: 'http://localhost:8888/news/find',
	          status: 'finished'
	        }],
	        textInput:'',
	        textarea:'',
	      	addShow:false,
	      	infom:true,
	        
	        }
	    },
    	methods:{
    		...mapActions("news",[
    			Get_NEWS_LIST,
				ASYNC_ADD_NEWS,
				ASYNC_GET_NEWS]),

    		add:function(){
    			this.addShow=true
    			this.infom=false
    		},
    		handleSelectionChange(val) {
		        console.log(val)
		        this.multipleSelection = val;
		      },
    		del:function(){
    			console.log(this.multipleSelection.length)
    			// this.multipleSelection=null
    		},
    		back:function(){
    			this.infom=true
    			this.addShow=false;
    			this[ASYNC_GET_NEWS]({})
    		},
    		handleChange(file, fileList) {
		        // this.fileList3 = fileList.slice(-3);
		        console.log(file.name);
		        this.photoName=file.name;//获取上传图片的图片名并赋值给this.photoName
		        console.log(1)
		        console.log(this.photoName)
		        console.log(1)
		      },
    		save:function(){
    			let times=(this.value1).toISOString().slice(0,10);
    			let obj={
    				title:this.titleInput,
    				time:times,
    				photo:this.photoName,
    				text:this.textInput,
    				comment:this.textarea
    			};
    			this[ASYNC_ADD_NEWS](obj)
    		},

      		deleteRow(index, rows) {
		        rows.splice(index, 1);
		    },
		    // editRow(index, rows){
		    // 	console.log(index,index.row)
		    // }
    	}	
	}
</script>
<style>
.mainBox{
	position: relative;
}
.infoBox{
	margin-top: 5px;
	width: 1100px;
	height: 350px;
}
.div{
	margin-top: 10px;
	width: 100%;
	height: 350px;
	position: relative;
	top: -48px;
	display: flex;
	flex-direction: column;
	background: linear-gradient(lightsteelblue, lightcyan, gainsboro, paleturquoise); 
}
.title,.time,.photo,.text,.comment{
	display: flex;
	align-items: center;
	width: 300px;
	margin-left: 20px;
	margin-top: 15px;
}
.btn{
	position: absolute;
	left: 350px;
	top:15px;
}
</style>