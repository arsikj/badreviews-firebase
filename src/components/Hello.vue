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
    <div class="container">
      <div class="row">
        <div class="col s10 offset-s1">
            <h3>Bad reviews for iOS applications</h3>
            <table class="bordered striped responsive-table">
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                </tr>
                <tr>
                  <td>Alan</td>
                  <td>Jellybean</td>
                  <td>$3.76</td>
                </tr>
                <tr>
                  <td>Jonathan</td>
                  <td>Lollipop</td>
                  <td>$7.00</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login');
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
