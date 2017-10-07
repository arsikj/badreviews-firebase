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
    <div class="container">
      <div class="row">
        <div class="col s10 offset-s1">
            <p>dsadaksjdhakjsdhakjsdhakjsdhakjsdhaskjda</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'favourites',
  data () {

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

<style scoped>
</style>
