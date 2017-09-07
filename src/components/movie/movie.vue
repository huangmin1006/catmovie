<template>
  <div>

    <!-- 增删查改的页面切换 -->
    <el-tabs type="border-card">
      <el-tab-pane label="电影信息">
        <!-- 查询框-->
        <div style="margin-top: 15px; margin-bottom: 15px;">
          <el-input placeholder="请输入内容"  props="search_input">
            <el-button slot="append" icon="search" @click="searchBtn"></el-button>
          </el-input>
        </div>


        <!-- 显示已有电影信息 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="movie_name"
            label="电影名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="movie_type"
            label="电影类型"
            width="150">
          </el-table-column>
          <el-table-column
            prop="movie_area"
            label="上映地区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="movie_score"
            label="电影评分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="movie_actors"
            label="演职人员"
            width="200">
          </el-table-column>
          <el-table-column
            prop="movie_time"
            label="时长"
            width="130">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                删除
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 增加页面 -->
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 新增电影</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="电影名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电影英文名" prop="eName">
            <el-input v-model="ruleForm.eName"></el-input>
          </el-form-item>
          <el-form-item label="电影评分" prop="score">
            <el-input v-model="ruleForm.score"></el-input>
          </el-form-item>

          <el-form-item label="演职人员" prop="peopleName">
            <el-input v-model="ruleForm.peopleName"></el-input>
          </el-form-item>
          <el-form-item label="放映厅类型" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择放映厅类型">
              <el-option label="3D" value="类型一"></el-option>
              <el-option label="IMAX 3D" value="类型二"></el-option>
              <el-option label="2D" value="类型三"></el-option>
              <el-option  label="IMAX 2D" value="类型四"></el-option>
              <el-option  label="激光放映厅" value="类型五"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上映时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="上映日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="大陆上映" prop="delivery">
            <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="电影类型" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="动作" name="type"></el-checkbox>
              <el-checkbox label="冒险" name="type"></el-checkbox>
              <el-checkbox label="科幻" name="type"></el-checkbox>
              <el-checkbox label="喜剧" name="type"></el-checkbox>
              <el-checkbox label="惊悚" name="type"></el-checkbox>
              <el-checkbox label="恐怖" name="type"></el-checkbox>
              <el-checkbox label="警匪" name="type"></el-checkbox>
              <el-checkbox label="纪录" name="type"></el-checkbox>
              <el-checkbox label="爱情" name="type"></el-checkbox>
              <el-checkbox label="战争" name="type"></el-checkbox>
              <el-checkbox label="犯罪" name="type"></el-checkbox>
              <el-checkbox label="武侠" name="type"></el-checkbox>
              <el-checkbox label="动画" name="type"></el-checkbox>
              <el-checkbox label="剧情" name="type"></el-checkbox>
              <el-checkbox label="青春" name="type"></el-checkbox>
              <el-checkbox label="励志" name="type"></el-checkbox>
              <el-checkbox label="伦理" name="type"></el-checkbox>
              <el-checkbox label="历史" name="type"></el-checkbox>
              <el-checkbox label="古装" name="type"></el-checkbox>
              <el-checkbox label="家庭" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="想看人数" prop="people">
            <el-input v-model="ruleForm.people"></el-input>
          </el-form-item>
          <el-form-item label="电影简介" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <!-- 上传图片 -->
          <!-- 电影图片 -->
          <el-form-item label="上传图片">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传电影图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!-- 演职人员图片 -->
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传演职人员图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <!-- 提交 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即增加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 修改页面 -->
      <el-tab-pane label="修改电影"> <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="电影名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电影英文名" prop="eName">
          <el-input v-model="ruleForm.eName"></el-input>
        </el-form-item>
        <el-form-item label="电影评分" prop="score">
          <el-input v-model="ruleForm.score"></el-input>
        </el-form-item>

        <el-form-item label="演职人员" prop="peopleName">
          <el-input v-model="ruleForm.peopleName"></el-input>
        </el-form-item>
        <el-form-item label="放映厅类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择放映厅类型">
            <el-option label="3D" value="类型一"></el-option>
            <el-option label="IMAX 3D" value="类型二"></el-option>
            <el-option label="2D" value="类型三"></el-option>
            <el-option  label="IMAX 2D" value="类型四"></el-option>
            <el-option  label="激光放映厅" value="类型五"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上映时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="上映日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="大陆上映" prop="delivery">
          <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="电影类型" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="动作" name="type"></el-checkbox>
            <el-checkbox label="冒险" name="type"></el-checkbox>
            <el-checkbox label="科幻" name="type"></el-checkbox>
            <el-checkbox label="喜剧" name="type"></el-checkbox>
            <el-checkbox label="惊悚" name="type"></el-checkbox>
            <el-checkbox label="恐怖" name="type"></el-checkbox>
            <el-checkbox label="警匪" name="type"></el-checkbox>
            <el-checkbox label="纪录" name="type"></el-checkbox>
            <el-checkbox label="爱情" name="type"></el-checkbox>
            <el-checkbox label="战争" name="type"></el-checkbox>
            <el-checkbox label="犯罪" name="type"></el-checkbox>
            <el-checkbox label="武侠" name="type"></el-checkbox>
            <el-checkbox label="动画" name="type"></el-checkbox>
            <el-checkbox label="剧情" name="type"></el-checkbox>
            <el-checkbox label="青春" name="type"></el-checkbox>
            <el-checkbox label="励志" name="type"></el-checkbox>
            <el-checkbox label="伦理" name="type"></el-checkbox>
            <el-checkbox label="历史" name="type"></el-checkbox>
            <el-checkbox label="古装" name="type"></el-checkbox>
            <el-checkbox label="家庭" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="想看人数" prop="people">
          <el-input v-model="ruleForm.people"></el-input>
        </el-form-item>
        <el-form-item label="电影简介" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <!-- 上传图片 -->
        <!-- 电影图片 -->
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传电影图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <!-- 演职人员图片 -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传演职人员图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form></el-tab-pane>
    </el-tabs>


  </div>


</template>


<script>
  import axios from "axios"
  export default {
    methods: {
      searchBtn(){
        console.log(123)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },


    data() {
      return {
        fileList2: [
          {name: '', url: ''},
          {name: '', url: ''}
        ],
        ruleForm: {
          name: '',
          eName:'',
          score:'',
          peopleName:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          search_input: '',
          resource: '',
          people:'',
          desc: ''

        },
        rules: {
          search_input:[
            {required:true,message:'请输入搜索条件', trigger:'blur'},
            {min:1}
          ],
          name: [
            { required: true, message: '请输入电影名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ],
          eName: [
            { required: true, message: '请输入电影英文名', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 1 到 60个字符', trigger: 'blur' }
          ],
          peopleName: [
            { required: true, message: '请输入演职人员', trigger: 'blur' },
            { min: 1, max: 999, message: '长度在 1 到 999个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择放映厅', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个电影类型', trigger: 'change' }
          ],
          people: [
            { required: true, message: '请输入想看人数', trigger: 'blur' },
            { min: 0, max: 999999999999999, message: '长度不限', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写电影简介', trigger: 'blur' }
          ]
        },
        // 发送数据
        //        actions: {
        // 	async[ASYNC_INSERT_MESSAGE]({dispatch}, message) {
        // 		await axios.post("http://localhost:3001/message/insert", message)
        // 		dispatch(ASYNC_GET_MESSAGE_LIST)
        // 	},
        // 	async[ASYNC_GET_MESSAGE_LIST](context) {
        // 		const {
        // 			data
        // 		} = await axios.get("http://localhost:3001/message/getMessage")
        // 		context.commit(GET_MESSAGE_LIST, data.data)
        // 	}
        // },

        tableData: [{
          movie_name: '长江一号',
          movie_type: '动画',
          movie_score: '9.9',
          movie_time: '102分钟',
          movie_actors: '周星驰',
          movie_area: '中国大陆'
        },{
          movie_name: '长江一号',
          movie_type: '动画',
          movie_score: '9.9',
          movie_time: '102分钟',
          movie_actors: '周星驰',
          movie_area: '中国大陆'
        }, {
          movie_name: '长江一号',
          movie_type: '动画',
          movie_score: '9.9',
          movie_time: '102分钟',
          movie_actors: '周星驰',
          movie_area: '中国大陆'
        }, {
          movie_name: '长江一号',
          movie_type: '动画',
          movie_score: '9.9',
          movie_time: '102分钟',
          movie_actors: '周星驰',
          movie_area: '中国大陆'
        }]

      }

    }
  }
</script>
<style scoped>
  .el-select .el-input {
    width: 100px;
  }


</style>


