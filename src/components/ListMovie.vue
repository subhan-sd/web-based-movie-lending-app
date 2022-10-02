<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <router-link to="/create-user">
          <button class="btn btn-success fluid mb-4 mt-4 btn btn-block">Add</button>
        </router-link>
      </div>
    </div>

  <!-- Card -->

  <div class="row">
  <div class="col-sm-3 mb-3" v-for="( i ) in items" :key="i.id">
    <div class="card" >
    <img v-bind:src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + i.poster_path" class="card-img-top" >
      <div class="card-body">
        <h5 class="card-title">{{ i.title }}</h5>
        <p class="card-text">Popularity : {{i.popularity}}</p>
        <div class="row">
            <div class="col">
              <router-link :to="'/detail-movie/' + i.id" type="button" class="btn btn-outline-primary btn-sm" v-on:click="updateUser(i.id)" >Go Detail </router-link>
            </div>
            <div class="col">
                Vote {{i.vote_average}}
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

    export default {
      name: 'list-movie',
      data(){
            return{
            items:[],
            };
        },
      methods:{
        getListMovie(){
            const credentials = {
              popularity: this.popularity,
              poster_path: this.poster_path,
              title: this.title,
              id: this.id,
              release_date: this.release_date,
              overview: this.overview,
              vote_average: this.vote_average
            };
            axios
                .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=e279742ee9d02802ec353c77f71026cc&language=en-US&page=1`,credentials)
                .then((response) => {
                  console.log(response.data.results)

                  this.items= [...response.data.results]
                  console.log(this.items.poster_path +"")

                })
                // .then((response) => console.log(response.data))
                .catch((err) => console.log(err.response+" error data tidak dapet"))
        }
      },created(){
        this.getListMovie();
    }

    }
    </script>