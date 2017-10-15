<template>
  <div>
    <nav class="teal lighten-2">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Bad reviews</a>
        <ul class="right hide-on-med-and-down">
          <li class="active"><router-link to="/hello">iOS</router-link></li>
          <li><router-link to="/android">Android</router-link></li>
          <li><router-link to="/favourites">Favourites</router-link></li>
          <li><a class="waves-effect waves-light btn red darken-1" v-on:click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
    <!-- <div class="container"> -->
      <div class="row">
          <h3>Bad reviews for iOS applications</h3>
        <div class="col s2">
          <ul class="collection with-header">
            <li class="collection-header"><h5>Select category</h5></li>
            <li class="collection-item">News</li>
            <li class="collection-item">Music</li>
            <li class="collection-item">Sport</li>
            <li class="collection-item">Travel</li>
            <li class="collection-item">Health</li>
            <li class="collection-item">Kids</li>
            <li class="collection-item">Medical</li>
            <li class="collection-item">Finance</li>
            <li class="collection-item">Book</li>
          </ul>
        </div>
        <div class="col s10">
            <table class="bordered striped responsive-table">
              <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Average rating</th>
                    <th>Bundle id</th>
                    <th>Developer</th>
                    <th>Action</th>
                    <th><a class="waves-effect waves-light btn red darken-1" v-on:click="getApps">Logout</a></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="app in apps">
                  <td><img v-bind:src="app.artworkUrl100" alt=""></td>
                  <td><a target="_blank" v-bind:href="app.trackViewUrl">{{app.trackCensoredName}}</a></td>
                  <td>{{app.description.substring(0, 70)}}...</td>
                  <td>{{app.averageUserRating}}</td>
                  <td>{{app.bundleId}}</td>
                  <td>{{app.artistName}}</td>
                  <td>
                    <button class="btn waves-effect waves-light" type="button" name="action">
                      Show
                    </button>
                  </td>
                  <td>dsadsa</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    <!-- </div> -->
    <modal name="bad-reviews" @before-open="openModal">


      <div class="card">
            <div class="card-content">
              <span class="card-title">Bad Reviews</span>
              <p>{{ content }}</p>
            </div>
          </div>
    </modal>
  </div>

</template>

<script>
import {firebaseConfig} from '../firebaseConfig';

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      apps: [],
      content: ''
    }
  },
  methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login');
        })
      },
      getApps: function(){
        this.$http.get('https://data.42matters.com/api/v2.0/ios/apps/search.json?q=Book&limit=20&access_token=dfaa2e3ea44ee26920fc5d6f904d680ed2863835').then(response => {
        this.apps = response.body.results;
        }, response => {

        });
      },
      openModal: function(event) {
        console.log(event.params.foo);
        this.content = event.params.foo;
      },
      showDetails: function(){
        this.$modal.show('bad-reviews', {foo:'bar'});
      }
    },
    beforeMount(){
      //this.getApps();
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
