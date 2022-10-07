<template>
    <div class="container mt-4">

        <div class="card rounded shadow" >
      <div class="card-header">
        Data Movie Pinjam Anda
      </div>
      <div class="card-body">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Sampul</th>
      <th scope="col">Judul</th>
      <th scope="col">Waktu Pinjam</th>
      <th scope="col">Lama Pinjam</th>
      <th scope="col">Akun</th>
      <th scope="col">No Telp</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="( i , index) in pinjam" :key="i.id">
      <th scope="row">{{index + 1}}</th>
      <td><img v-bind:src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + i.poster" class="card-img-top" style="height: auto; width: 100px;"></td>
      <td>{{i.judul_film}}</td>
      <td>{{i.waktu_pinjam}}</td>
      <td>{{i.lama_pinjam}}</td>
      <td>{{i.user}}</td>
      <td>{{i.no_telp}}</td>
      <td><button class="btn btn-danger" @click.prevent="del(i.id)">delete</button></td>
    </tr>
  </tbody>
</table>
    </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { onMounted,ref } from 'vue';
    import { useRouter } from 'vue-router';
    
        export default {
          name: 'daftar-pinjam',
    
            setup (){
              // --> Reactive State(wadah secara realtime)
              let pinjam= ref([]);

              onMounted(() => {
                // --> Get data from api endpoint data pinjam
                axios.get('http://localhost:3004/pinjam',pinjam)
                .then((result)=> {
                  console.log(result.data)
                  pinjam.value = result.data
                }).catch((err) => {
                  console.log(err.response)
                })
              })

              const router = useRouter();

              function del(id){
                axios.delete(`http://localhost:3004/pinjam/${id}`)
                .then((result)=> {
                  console.log(result.data)
                  pinjam.value = result.data
                  router.push({
                    name: 'list-movie'
                    })
                  alert("Data Telah Di Hapus")
                }).catch((err) => {
                  console.log(err.response)
                })
              }
    
              return{
                pinjam,
                del
              }
          }
        }
        </script>