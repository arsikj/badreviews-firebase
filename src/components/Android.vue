<template>
  <div>
    <nav class="teal lighten-2">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Bad reviews</a>
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/hello">iOS</router-link></li>
          <li class="active"><router-link to="/android">Android</router-link></li>
          <li><router-link to="/favourites">Favourites</router-link></li>
          <li><a class="waves-effect waves-light btn red darken-1" v-on:click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
    <!-- <div class="container"> -->
      <div class="row">
          <h3>Bad reviews for Android applications</h3>
        <div class="col s2">
          <ul class="collection with-header">
            <li class="collection-header"><h5>Select category</h5></li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('News')">News</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Music')">Music</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Sport')">Sport</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Travel')">Travel</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Health')">Health</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Kids')">Kids</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Medical')">Medical</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Finance')">Finance</li>
            <li class="collection-item category-item" v-on:click="getAppsByCategory('Book')">Book</li>
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
                </tr>
              </thead>

              <tbody>
                <tr v-for="app in apps">
                  <td><img v-bind:src="app.icon" alt="" style="height: 72px; width: 72px"></td>
                  <td><a target="_blank" v-bind:href="app.market_url">{{app.title}}</a></td>
                  <td>{{app.description.substring(0, 70)}}...</td>
                  <td>{{app.rating}}</td>
                  <td>{{app.package_name}}</td>
                  <td>{{app.developer}}</td>
                  <td>
                    <button class="btn waves-effect waves-light" style="width: 100px" type="button" v-on:click="showDetails(app.package_name)" name="action">
                      Show
                    </button>
                    <button class="btn waves-effect waves-light" style="margin-top: 10px; width: 100px;" type="button" v-on:click="addFavourite(app)" name="action">
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    <!-- </div> -->
    <modal name="bad-reviews" @before-open="openModal" :height="600" :draggable="true">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Bad Reviews</span>
          <p v-html="content"></p>
        </div>
      </div>
    </modal>
  </div>

</template>

<script>
import {firebaseConfig} from '../firebaseConfig';
import toastr from 'toastr'

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
        firebaseConfig.auth().signOut().then(() => {
          this.$ma.trackEvent({category: 'Click', action: 'User logout', label: '', value: ''});
          this.$router.replace('login');
        })
      },
      getApps: function(){
        this.$http.get('https://data.42matters.com/api/v2.0/android/apps/search.json?q=News&limit=20&access_token=dfaa2e3ea44ee26920fc5d6f904d680ed2863835').then(response => {
        this.apps = response.body.results;
        }, response => {
          console.log("Error: " + response);
        });
      },
      openModal: function(event) {
        console.log(event.params.reviews);
        this.content = event.params.reviews;
      },
      showDetails: function(packageName){
        var url = "https://data.42matters.com/api/v2.0/android/apps/reviews.json?p=" + packageName
        + "&access_token=dfaa2e3ea44ee26920fc5d6f904d680ed2863835&rating=2";
        this.$http.headers.common['Access-Control-Allow-Origin'] = true;
        this.$http.headers.common['Access-Control-Allow-Origin'] = '*'
        this.$http.options.emulateJSON = true;
        this.$http.get(url).then(response => {
          var reviews = response.body.reviews;
          var reviewsText = "";
          var length = 5;
          if(response.body.message) {
            reviewsText = "No reviews available for app id " + packageName;
          } else {
            if(reviews.length < 5) {
              length = reviews.length;
            }
            for(var i = 0; i < length; i ++) {
              reviewsText += (i+1)+". ";
              reviewsText += reviews[i].content;
              reviewsText += "\n\n<br>";
            }
          }
          this.$ma.trackEvent({category: 'Click', action: 'Viewed bad reviews for Android', label: '', value: ''});
          this.$modal.show('bad-reviews', {reviews: reviewsText});
        }, response => {
            var reviewsText = "No reviews available for app id " + packageName;
            this.$ma.trackEvent({category: 'Click', action: 'Viewed bad reviews for Android failed', label: '', value: ''});
            this.$modal.show('bad-reviews', {reviews: reviewsText});
        });
      },
      getAppsByCategory: function(category){
        var url = "https://data.42matters.com/api/v2.0/android/apps/search.json?q="
                  + category
                  + "&limit=20&access_token=dfaa2e3ea44ee26920fc5d6f904d680ed2863835";
        this.$http.get(url).then(response => {
        this.apps = response.body.results;
        this.$ma.trackEvent({category: 'Click', action: 'Changed Android category ' + category, label: '', value: ''});
        }, response => {
          this.$ma.trackEvent({category: 'Click', action: 'Changed Android category failed ' + category, label: '', value: ''});
          console.log("Error: " + response);
        });
      },
      addFavourite: function(app) {
        let db = firebaseConfig.database();
        let currentUser = firebaseConfig.auth().currentUser.uid;
        let favouritesRef = db.ref('favourites/' + currentUser + '/android');
        favouritesRef.push(app);
        this.$ma.trackEvent({category: 'Click', action: 'Added favourite Android app', label: '', value: ''});
        toastr.success('Android app successfully added to favourites');
      }
    },
    beforeMount(){
      this.getApps();
    }

}
</script>

<style scoped>
  .category-item {
    cursor: pointer;
    cursor: hand;
  }
  .category-item:hover {
    background: #26a69a;
  }
</style>
