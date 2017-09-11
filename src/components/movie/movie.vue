<template>
  <div>

    <!-- 增删查改的页面切换 -->
    <el-tabs type="border-card" v-model="all_page">
      <el-tab-pane label="电影信息" name="one">
        <!-- 显示已有电影信息 -->
        <el-table
          :data='tableData'
          border
          style="width: 100%"
          height="300"
          @cell-mouse-enter="replace_id">
          <el-table-column
            prop="name"
            label="电影名"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="type"
            label="电影类型"
            width="150">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="电影简介"
            width="300"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="score"
            label="电影评分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="peopleName"
            label="演职人员"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="people"
            label="想看人数"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
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
      </el-tab-pane>


      <!-- 增加页面 -->
      <el-tab-pane name="two">
        <span slot="label"><i class="el-icon-date"></i> 新增电影</span>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="电影名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电影英文名" prop="eName">
            <el-input v-model="ruleForm.eName"></el-input>
          </el-form-item>
          <el-form-item label="电影评分" prop="score1">
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
              <el-form-item prop="date">
                <el-date-picker type="date" placeholder="上映日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
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
              action="http://localhost:8888/upload"
              :on-success="movieImgCallback"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传电影图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!-- 演职人员图片 -->
            <el-upload
              class="upload-demo"
              action="http://localhost:8888/upload"
              :on-success="starImgCallback"
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
          </el-form-item>
        </el-form>
      </el-tab-pane>


      <!-- 修改页面 -->
      <el-tab-pane label="修改电影" name="three">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
            <el-button type="primary" @click="submitFormRepalce">立即修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
  import {mapState} from "vuex"
  import {ASYNC_ADD_MOVIE,
    ASYNC_UPDATE_MIVIE,
    ASYNC_GET_MOVIE_LIST,
    ASYNC_GET_MOVIE_LIST_REPLACE,
    ASYNC_GET_MOVIE_LIST_DEL} from "./store.js"
  import {mapActions} from "vuex"

  export default {
    async beforeMount(){
      await this.$store.dispatch({
        type: ASYNC_GET_MOVIE_LIST
      })
    },
    computed: {
      tableData(){
        return this.$store.state.movie.tableData
      },
      updateData(){
        return this.$store.state.movie.updateData
      }
    },

    methods: {


      // 删除
      async	deleteRow(index, rows) {
        await this.$store.dispatch({
          type:ASYNC_GET_MOVIE_LIST_DEL,
          id:this.option_id
        })
      },
      // 修改
      async handleEdit(index, row) {
        // 将页面跳转到修改页面
        this.all_page="three"
        await this.$store.dispatch({
          type:ASYNC_GET_MOVIE_LIST_REPLACE,
          id:this.option_id
        })
        this.ruleForm.name = this.updateData.name;
        this.ruleForm.eName = this.updateData.eName;
        this.ruleForm.score = this.updateData.score;
        this.ruleForm.peopleName = this.updateData.peopleName;
        this.ruleForm.region = this.updateData.region;
        this.ruleForm.date1 = this.updateData.date1;
        this.ruleForm.delivery = this.updateData.delivery;
        this.ruleForm.type = this.updateData.type;
        this.ruleForm.people = this.updateData.people;
        this.ruleForm.desc = this.updateData.desc;
        this.ruleForm.movieArr = this.updateData.movieArr;
      },
      async replace_id(row){
        this.option_id = row._id;


      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //增加

      // 上传电影图片
      movieImgCallback(response,file){
        let movieImg = response.url;
        this.movieArrFile.push(movieImg);
        this.ruleForm.movieArr = this.movieArrFile;
      },

      // 上传演员图集
      starImgCallback(response,file){
        let movieImg = response.url;
        this.starArrFile.push(movieImg);
        this.ruleForm.starArr = this.starArrFile;
      },


      submitForm(ruleForm) {
        // 创建一个对象保存所有电影数据
        let movieInfo = {
          name:this.ruleForm.name,
          eName:this.ruleForm.eName,
          score:this.ruleForm.score,
          peopleName:this.ruleForm.peopleName,
          region:this.ruleForm.region,
          date1:this.ruleForm.date1,
          delivery:this.ruleForm.delivery,
          type:this.ruleForm.type,
          people:this.ruleForm.people,
          desc:this.ruleForm.desc,
          movieArr: this.ruleForm.movieArr,
          starArr: this.ruleForm.starArr
        };
        // 通过dispatch将上面创建的对象发送到主页刷新页面
        this.$store.dispatch({
          type:'ASYNC_ADD_MOVIE',
          movieInfo
        })

      },

      //修改
      submitFormRepalce(){
        //保存点击去修改后获取到的数据
        let update_movieInfo = {
          name:this.ruleForm.name,
          eName:this.ruleForm.eName,
          score:this.ruleForm.score,
          peopleName:this.ruleForm.peopleName,
          region:this.ruleForm.regione,
          date1:this.ruleForm.date1,
          delivery:this.ruleForm.delivery,
          type:this.ruleForm.type,
          people:this.ruleForm.people,
          desc:this.ruleForm.desc

        }
        // 通过dispatch将上面创建的对象发送到主页刷新页面
        this.$store.dispatch({
          type:'ASYNC_UPDATE_MIVIE',
          update_movieInfo,
          id:this.option_id
        })
        this.all_page="one"


      },


    },


    data() {
      return {

        movieArrFile: [],
        starArrFile: [],
        all_page:'one',
        option_id:'',
        fileList2: [],
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
          movieArr: [],
          starArr: [],
          search_input: '',
          resource: '',
          people:'',
          desc: ''

        },

      }

    }
  }
</script>
<style scoped>
  .el-select .el-input {
    width: 100px;
  }


</style>


