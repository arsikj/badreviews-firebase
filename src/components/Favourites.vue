<template>
  <div>
    <nav class="teal lighten-2">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Bad reviews</a>
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/hello">iOS</router-link></li>
          <li><router-link to="/android">Android</router-link></li>
          <li class="active"><router-link to="/favourites">Favourites</router-link></li>
          <li><a class="waves-effect waves-light btn red darken-1" v-on:click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
    <!-- <div class="container"> -->
      <div class="row">
        <div class="col s12">
            <h3>Favourite apps</h3>
            <div class="col s12">
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
                    <tr v-for="app in favouriteAndroidApps">
                      <td><img v-bind:src="app.icon" alt="" style="height: 72px; width: 72px"></td>
                      <td><a target="_blank" v-bind:href="app.market_url">{{app.title}}</a></td>
                      <td>{{app.description.substring(0, 70)}}...</td>
                      <td>{{app.rating}}</td>
                      <td>{{app.package_name}}</td>
                      <td>{{app.developer}}</td>
                      <td>
                        <button class="btn waves-effect waves-light" type="button" v-on:click="removeApp(app, true)" name="action">
                          Remove
                        </button>

                      </td>
                    </tr>
                    <tr v-for="app in favouriteIosApps">
                      <td><img v-bind:src="app.artworkUrl100" alt="" style="height: 72px; width: 72px"></td>
                      <td><a target="_blank" v-bind:href="app.trackViewUrl">{{app.trackCensoredName}}</a></td>
                      <td>{{app.description.substring(0, 70)}}...</td>
                      <td>{{app.averageUserRating}}</td>
                      <td>{{app.bundleId}}</td>
                      <td>{{app.artistName}}</td>
                      <td>
                        <button class="btn waves-effect waves-light" type="button" v-on:click="removeApp(app, false)" name="action">
                          Remove
                        </button>

                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import {firebaseConfig} from '../firebaseConfig';
import toastr from 'toastr'

export default {
  name: 'favourites',
  firebase: {
    favouriteAndroidApps : [],
    favouriteIosApps: []
  },
  data () {
    return {

    }
  },
  methods: {
    logout: function() {
      firebaseConfig.auth().signOut().then(() => {
        this.$ma.trackEvent({category: 'Click', action: 'User logout', label: '', value: ''});
        this.$router.replace('login');
      })
    },
    getFavouriteApps: function(){
      let db = firebaseConfig.database();
      let currentUser = firebaseConfig.auth().currentUser.uid;
      this.$bindAsArray('favouriteAndroidApps', db.ref('favourites/' + currentUser + '/android'));
      this.$bindAsArray('favouriteIosApps', db.ref('favourites/' + currentUser + '/ios'));
      //this.favouriteAndroidApps = db.ref('favourites/' + currentUser + '/android');
    },
    removeApp: function(app, isAndroid) {
      let db = firebaseConfig.database();
      let currentUser = firebaseConfig.auth().currentUser.uid;
      if(confirm("Are you sure you want to delete this app from favourites list?")) {
        if(isAndroid) {
          db.ref('favourites/' + currentUser + '/android').child(app['.key']).remove();
          this.$ma.trackEvent({category: 'Click', action: 'Removed favourite Android app', label: '', value: '' });
          toastr.success('Android app removed successfully');
        } else {
          db.ref('favourites/' + currentUser + '/ios').child(app['.key']).remove();
          this.$ma.trackEvent({category: 'Click', action: 'Removed favourite iOS app', label: '', value: '' });
          toastr.success('iOS app removed successfully');
        }
      }

    }
  },
  beforeMount(){
    this.getFavouriteApps();
  }
}
</script>

<style scoped>
</style>
