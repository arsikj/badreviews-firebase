<template>
  <div class="login">
    <h3>Sign in</h3>
    <input type="email" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="login">Connection</button>
    <p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'

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
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
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
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
  }
  p a {

  }
</style>
