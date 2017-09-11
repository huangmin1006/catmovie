import axios from 'axios';


const store = ({
    state:{
        movieMsg_movie_tab:[],
        movieMsg_movie:[],
        movieMsg_cinema:[],
        movieMsg_movieHall:[],
        movieMsg_add:[],
        movieMsg_seat:[]
    },
    mutations:{
        movieMsg_seat(state,obj){
            state.movieMsg_seat=obj.val 
        },
        movieMsg_seat_no(state,obj){
            state.movieMsg_seat=[] 
        },
        movieMsg_movies(state,obj){
            state.movieMsg_movie=obj.val 
            
        },
         movieMsg_movie_tab(state,obj){
             
            state.movieMsg_movie_tab=obj.val 
        },
        movieMsg_cinema(state,obj){
            state.movieMsg_cinema=obj.val 
        },
        movieMsg_movieHall(state,obj){
            state.movieMsg_movieHall=obj.val 
        },
         movieMsg_data(state,obj){
            state.movieMsg_add=obj.val 
        },
    },
    actions:{
        //选项信息
       async movieMsg_movies({ commit },obj){
            var arr= await axios.get("http://localhost:8888/movie/find")
            commit({
                    type:'movieMsg_movies',
                    val:arr.data
           })
   
        },
        //排片表
        async movieMsg_data({ commit },obj){
            var arr= await axios.get("http://localhost:8888/rowPiece/find",{
                params:{
                    name:obj.id,
                }  
            })
            commit({
                    type:'movieMsg_data',
                    val:arr.data
           })
        },
        //上传排片信息
        async  movieMsg_add({ commit },obj){
            axios.get("http://localhost:8888/videoHall/find",{
                params:{
                      _id:obj.movieHall
                }  
            }).then(function(msg){                
            axios.get("http://localhost:8888/rowPiece/add",{
                params:{
                    name:obj.name,
                    cinemaID:obj.cinema,
                    movieHallID:obj.movieHall,
                    time:obj.time,
                    num1:obj.num1,
                    movieHall_name:msg.data.hallName,
                    cinema_name:obj.cinema_name,
                    movies_name:obj.movies_name,
                    seting:msg.data.seatData
                }

        })
            });
},
        //电影翻页
        async movieMsg_movie_tab({ commit },obj){
            var arr= await axios.get("http://localhost:8888/movie/find",{
                params:{
                      cinema:obj.cinema,
                        page:obj.page,
                        rows:5
                }  
            })
            commit({
                    type:'movieMsg_movie_tab',
                    val:arr.data
           })
        },
        //座位信息
        async movieMsg_seat({ commit },obj){
            axios.get("http://localhost:8888/rowPiece/find",{
                params:{
                     _id:obj.id,
                }  
            }).then(function(arr){

            if(arr.data.seting.length>0){
                for(let i=0;i<arr.data.seting.length;i++){

                }
                commit({
                    type:'movieMsg_seat',
                    val:arr.data.seting
           })
                
            }else{
               commit({
                    type:'movieMsg_seat_no',
                }) 
            }                
            })
        
            
        },
        //查找电影院
        async movieMsg_cinema({ commit },obj){
            var arr= await axios.get("http://localhost:8888/cinema/find")
            commit({
                    type:'movieMsg_cinema',
                    val:arr.data
           })
        },
    //查找放映厅
        async movieMsg_movieHall({ commit },obj){
            var arr= await axios.get("http://localhost:8888/videoHall/find",{
                params:{
                      cinemaID:obj.cinema
                }  
            })
            commit({
                    type:'movieMsg_movieHall',
                    val:arr.data
           })
        },
    }
})
 
 export default store