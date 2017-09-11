import axios from "axios"
// 增加
export const GET_MOVIE_LIST = "GET_MOVIE_LIST";
export const ASYNC_ADD_MOVIE = "ASYNC_ADD_MOVIE";
export const ASYNC_GET_MOVIE_LIST = "ASYNC_GET_MOVIE_LIST";
// 修改
export const GET_MOVIE_LIST_REPLACE = "GET_MOVIE_LIST_REPLACE";
export const ASYNC_GET_MOVIE_LIST_REPLACE = "ASYNC_GET_MOVIE_LIST_REPLACE";
export const ASYNC_UPDATE_MIVIE = "ASYNC_UPDATE_MIVIE";
// 删除
export const GET_MOVIE_LIST_DEL = "GET_MOVIE_LIST_DEL";
export const ASYNC_GET_MOVIE_LIST_DEL = "ASYNC_GET_MOVIE_LIST_DEL";







export default {
	state:{
		// 增加
	 tableData: [{
          movie_name: '',
          movie_type: '',
          movie_score: '',
          movie_time: '',
          movie_actors: '',
          movie_area: ''
        }],
        // 修改
    updateData:[{}],
        // 删除
    delData:[{}]


	},
	mutations:{
		// 增加
		[GET_MOVIE_LIST](state, tableData){
			state.tableData = tableData
			return state
		},
		// 修改
		[GET_MOVIE_LIST_REPLACE](state, updateData){
			state.updateData = updateData
			return state
		},
		// 删除
		[GET_MOVIE_LIST_DEL](state, delData){
			state.delData = delData
			return state
		}
	},
	actions:{
		// 增加
		async[ASYNC_ADD_MOVIE]({dispatch}, movie){
			await axios.post("http://localhost:8888/movie/add",movie.movieInfo )
			dispatch(ASYNC_GET_MOVIE_LIST);
		},
		// 删除
		async[ASYNC_GET_MOVIE_LIST_DEL](context,obj){
			await axios.get("http://localhost:8888/movie/del",{
				params:{
					_id:obj.id
				}
			});
			const{
				data
			} = await axios.get("http://localhost:8888/movie/find");
			context.commit(GET_MOVIE_LIST, data)

		},
		// 修改
		async[ASYNC_UPDATE_MIVIE](context,obj){
			await axios.get("http://localhost:8888/movie/update",{
				params:{
					_id:obj.id,
					name:obj.update_movieInfo.name,
					eName:obj.update_movieInfo.eName,
					score:obj.update_movieInfo.score,
					peopleName:obj.update_movieInfo.peopleName,
					region:obj.update_movieInfo.region,
					date1:obj.update_movieInfo.date1,
					delivery:obj.update_movieInfo.delivery,
					type:obj.update_movieInfo.type,
					people:obj.update_movieInfo.people,
					desc:obj.update_movieInfo.desc,
					movieArr:obj.update_movieInfo.movieArr
				}

			});
			const{
				data
			} = await axios.get("http://localhost:8888/movie/find");
			context.commit(GET_MOVIE_LIST, data)
		},
		// 查看
		async[ASYNC_GET_MOVIE_LIST](context){
			const{
				data
			} = await axios.get("http://localhost:8888/movie/find");
			context.commit(GET_MOVIE_LIST, data)
		},
		async[ASYNC_GET_MOVIE_LIST_REPLACE](context,obj){
			const{
				data
			} = await axios.get("http://localhost:8888/movie/find",{
				params:{
					_id:obj.id
				}
			});
			context.commit(GET_MOVIE_LIST_REPLACE, data)
        }


	}
}
