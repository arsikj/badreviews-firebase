<template>
  <div class="sign-up">
    <p>Let's create a new account!</p>
    <input type="email" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button v-on:click="signUp">Sign up</button>
    <span>or go back to <router-link to="/login">login.</router-link></span>
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
  .signUp{
    margin-top: 40px;
  }

  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }

  button {
    margin-top:10px;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top:20px;
    font-size: 11px;
  }
</style>
