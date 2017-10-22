<template>
  <div class="container">
    <h3>Sign in</h3>
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
            <a class="waves-effect waves-light btn" v-on:click="login">Sign in</a>
            <p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
          </div>
        </div>
  </div>
</template>

<script>
import {firebaseConfig} from '../firebaseConfig';

export default {
  name: 'login',
  data: function(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function(){
      firebaseConfig.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$ma.trackEvent({category: 'Click', action: 'Login success', label: '', value: ''});
          this.$router.replace('hello');
        },
        (err) => {
          this.$ma.trackEvent({category: 'Click', action: 'Login success', label: '', value: ''});
          alert('Oops. ' + err.message);
        }
      );
    }
  }
}
</script>

<style scoped>

</style>
