<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <router-link :to="{ name:'daftar-pinjam'} ">
          <button class="btn btn-success fluid mb-4 mt-4 btn btn-block">Daftar Pinjam Anda</button>
        </router-link>
      </div>
    </div>

  <!-- Card -->

  <div class="row">
  <div class="col-sm-3 mb-3" v-for="( i) in movie" :key="i.id">
    <div class="card" >
    <img v-bind:src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + i.poster_path" class="card-img-top" >
      <div class="card-body">
        <h5 class="card-title">{{ i.title }}</h5>
        <p class="card-text">Popularity : {{i.popularity}}</p>
        <div class="row ">
            <div class="col d-grid gap-2 ">
              <router-link :to="{name: 'detail-movie', params:{id:i.id}}" type="button" class="btn btn-outline-primary btn-sm" >Go Detail </router-link>
            </div>
            <div class="col d-grid gap-2 ">
              <router-link :to="{ name:'AddMovie', params:{id:i.id}}" class="col btn btn-primary btn-sm" type="button" >Pinjam</router-link>
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
import { onMounted,ref } from 'vue';

    export default {
      name: 'list-movie',

        setup (){
          // --> Reactive State(wadah secara realtime)
          let movie= ref([]);

          onMounted(() => {
            // --> Get data from api endpoint
            axios.get('http://localhost:3004/film',movie)
            .then((result)=> {
              console.log(result.data)
              movie.value = result.data
            }).catch((err) => {
              console.log(err.response)
            })
          })

          return{
            movie
          }

      // --> Old Version 

      // data(){
      //       return{
      //         data:{
      //           title:''
      //         },
      //       items:[],
      //       };
      //   },
      // methods:{
      //   getListMovie(){
      //       const credentials = {
      //         popularity: this.popularity,
      //         poster_path: this.poster_path,
      //         title: this.title,
      //         id: this.id,
      //         release_date: this.release_date,
      //         overview: this.overview,
      //         vote_average: this.vote_average
      //       };
      //       axios
      //           .get(`http://localhost:3004/film`,credentials)
      //           .then((response) => {
      //             console.log(response.data)
      //             this.items= [...response.data]
      //             // console.log(this.items.poster_path +"")

      //           })
      //           // .then((response) => console.log(response.data))
      //           .catch((err) => console.log(err.response+" error data tidak dapet"))
      //   },
      //   updateUser(id){
      //       axios.get("http://localhost:3004/film/"+ id)
      //       // axios.get("http://localhost:8084/"+ id)
      //       .then((response) => console.log(response.data))
      //       // this.$router.push({username: username});
      //   },
      // },created(){
      //   this.getListMovie();
    // }

      }
    }
    </script>