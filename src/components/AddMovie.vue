<template>
   <div class="container">
    <div class="row">
      <div class="col">
        <router-link :to="{ name:'list-movie'} ">
          <button class="btn btn-success fluid mb-4 mt-4 btn btn-block">Back</button>
        </router-link>
      </div>
    </div>

  <!-- Card -->
    <div class="card rounded shadow" >
      <div class="card-header">
        Form Pinjam
      </div>
      <div class="card-body">
        <form @submit.prevent="pushPinjam()">

          <div class="row">
            <div class="col">
              <div class="mb-3">
            <label for="" class="form-label">Peminjam</label>
            <input type="text" class="form-control" v-model="pinjam.user" >
          <div class="text-danger" v-if="validation.title">
           {{validation.title}}
          </div>
          </div>
            </div>
            <div class="col">
              <div class="mb-3">
            <label for="" class="form-label">No Telp</label>
            <input type="number" class="form-control" v-model="pinjam.no_telp">
          <div class="text-danger" v-if="validation.no_telp">
           {{validation.no_telp}}
          </div>
          </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label">Waktu Pinjam</label>
            <input type="text" class="form-control" v-model="pinjam.waktu_pinjam" placeholder="yyyy-mm-dd">
          <div class="text-danger" v-if="validation.waktu_pinjam">
           {{validatio.waktu_pinjam}}
          </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label">Lama Pinjam</label>
            <select name="" id="" class="form-select"  v-model="pinjam.lama_pinjam">
              <option value="3 hari">3 hari</option>
              <option value="7 hari">7 hari</option>
              <option value="14 hari">14 hari</option>
            </select>
          <div class="text-danger" v-if="validation.lama_pinjam">
           {{validation.lama_pinjam}}
          </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label">Judul</label>
            <input type="text" class="form-control" v-model="movie.title">
          <div class="text-danger" v-if="validation.title">
           {{validation.title}}
          </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label">Film Dewasa (21+)</label>
            <input type="text" class="form-control" v-model="movie.adult">
          <div class="text-danger" v-if="validation.adult">
           {{validation.adult}}
          </div>
          </div>

          <button class="btn btn-outline-primary">Submit</button>
        </form>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import { reactive , ref , onMounted} from 'vue';
  import { useRoute , useRouter } from 'vue-router';
    export default {
      name: 'add-movie',

      setup() {

        const movie= reactive({
          adult:'',
          popularity : '',
          poster_path: '',
          title : '',
          id : '',
          release_date : '',
          overview : '',
          vote_average : '',
          backdrop_path : ''
        });

        const pinjam= reactive({
          id: '',
          waktu_pinjam: '',
          lama_pinjam: '',
          no_telp: '',
          user: '',
          judul_film:'',
          film_dewasa:'',
          poster:''
        })

        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
          axios.get(`http://localhost:3004/film/${route.params.id}`)
          .then((result)=> {
            console.log(result.data)
            movie.adult = result.data.adult
            movie.popularity = result.data.popularity
            movie.poster_path = result.data.poster_path
            movie.title = result.data.title
            movie.id = result.data.id
            movie.release_date = result.data.release_date
            movie.overview = result.data.overview
            movie.vote_average = result.data.vote_average
            movie.backdrop_path = result.data.backdrop_path
            pinjam.judul_film = movie.title
            pinjam.film_dewasa = movie.adult
            pinjam.poster=movie.poster_path
            }).catch((err) => {
              console.log(err.response.data )
            })
        })

        function pushPinjam(){
          axios.post("http://localhost:3004/pinjam",pinjam)
          .then(() =>{
            router.push({
              name: 'daftar-pinjam'
            })
          }).catch((err) =>{
            validation.value = err.response.data
          })
        }

        return {
          movie , 
          validation,
          router,
          pinjam,
          pushPinjam
        }
      }
    }
    </script>