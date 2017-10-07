<template>
  <div class="container">
    <h3>Let's create a new account!</h3>
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input id="email" type="email" class="validate" v-model="email">
            <label for="email">E-mail</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input id="password" type="password" class="validate" v-model="password">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <a class="waves-effect waves-light btn" v-on:click="signUp">Sign up</a>
            <p>or go back to <router-link to="/login">login.</router-link></p>
          </div>
        </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('hello');
        },
        (err) => {
          alert('Oops. ' + err.message);
        }
      );
    }
  }
}
</script>

<style scoped>
</style>
