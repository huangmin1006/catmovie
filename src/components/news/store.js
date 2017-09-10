import axios from 'axios'

export const Get_NEWS_LIST="Get_NEWS_LIST"
export const ASYNC_ADD_NEWS="ASYNC_ADD_NEWS"
export const ASYNC_GET_NEWS="ASYNC_GET_NEWS"


const store={
	namespaced:true,
	state:{
		tableData3:[]
	},
	mutations:{
		[Get_NEWS_LIST](state,tableData3){
			state.tableData3=tableData3;
		}
	},
	actions:{
		async[ASYNC_ADD_NEWS]({dispatch},news){
			let val= await axios.get("http://localhost:8888/news/add",{
				params:{
					title:news.title,
					time:news.time,
					photo:news.photo,
					text:news.text,
					comment:news.comment
				}
			},news);
			dispatch(ASYNC_GET_NEWS)
		},

		async[ASYNC_GET_NEWS]({commit},news){
			const{data} = await axios.get("http://localhost:8888/news/find",{},news);
			commit(Get_NEWS_LIST,data)
		},

	},

}


export default store