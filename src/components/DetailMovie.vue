<template>
  <div class="container">
        <div class="card mt-5"  v-bind:style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ movie.backdrop_path + ')' }"  style="background-repeat: no-repeat;  background-size: cover; background-color: #EFEFEF;">
      <div class="container mt-3 mb-3" style="padding:5px 30px;" >
        <div class="row" >
          <div class="col-3">
            <img class="card-img-top" v-bind:src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path" >
          </div>
          <div class="col-9" style="padding:70px 30px;">

            <!-- title  -->
            <div class="row pt-3 mb-3" style="
                background: rgba(255, 255, 255, 0.39);border-radius: 16px;box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);backdrop-filter: blur(7.9px);-webkit-backdrop-filter: blur(7.9px);border: 1px solid rgba(255, 255, 255, 0.32);">

              <h1>
                {{ movie.title }} 
              </h1>
              <div class="row">
                <div class="col-sm-3">
                  <p style="margin-top:-10px; color: #333;"> Realise Date : {{ movie.release_date}}</p>
                </div>
                <div class="col-sm-3">
                  <p style="margin-top:-10px; color: #F2C94C; font-weight: 500;" > Rating:{{ movie.vote_average}}</p>
                </div>
              </div>
            </div>

            <!-- overview -->
            <div class="row" style="
                background: rgba(255, 255, 255, 0.39);border-radius: 16px;box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);backdrop-filter: blur(7.9px);-webkit-backdrop-filter: blur(7.9px);border: 1px solid rgba(255, 255, 255, 0.32);">
              <h2>overview</h2>
              <p>{{ movie.overview}}</p>
            </div>

            <!-- pinjam button -->
              <div class="button mt-4">
                <router-link :to="`/AddMovie/${movie.id}`" class="col btn btn-primary btn-lg" type="button" >Pinjam</router-link>
              </div> 
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
  <div class="col-sm-2 mb-3" v-for="( i ) in recomendation" :key="i.id">
    <div class="card" style="height: 476px;">
    <img v-bind:src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + i.poster_path" class="card-img-top" >
      <div class="card-body">
        <h5 class="card-title">{{ i.title }}</h5>
        <p class="card-text">Popularity : {{i.popularity}}</p>
        <div class="row">
            <div class="col">
              <router-link :to="{name: 'detail-movie', params:{id:i.id}}" type="button" class="btn btn-outline-primary btn-sm" >Go Detail </router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { reactive , ref , onMounted} from 'vue';
  import { useRoute , useRouter } from 'vue-router';

    export default {
      name: 'detail-movie',

      setup() {

        const movie= reactive({
          popularity : '',
          poster_path: '',
          title : '',
          id : '',
          release_date : '',
          overview : '',
          vote_average : '',
          backdrop_path : ''
        });

        const recomendation = ref([]);

        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
          axios.get(`http://localhost:3004/film/${route.params.id}`)
          .then((result)=> {
            console.log(result.data)
            movie.popularity = result.data.popularity
            movie.poster_path = result.data.poster_path
            movie.title = result.data.title
            movie.id = result.data.id
            movie.release_date = result.data.release_date
            movie.overview = result.data.overview
            movie.vote_average = result.data.vote_average
            movie.backdrop_path = result.data.backdrop_path
            }).catch((err) => {
              console.log(err.response.data )
            })
        })

        onMounted(() => {
            // --> Get data from api endpoint
            axios.get('http://localhost:3004/film',recomendation)
            .then((result)=> {
              console.log(result.data)
              recomendation.value = result.data
            }).catch((err) => {
              console.log(err.response)
            })
          })


        return {
          movie , 
          validation,
          router,
          recomendation
        }

      
    // --> Old Version
    
    //   data(){
    //     return{
    //       id:'',
    //     };
    // },
    // methods: {
    // created(){  
    // }
    // }

      }
    }
    </script>