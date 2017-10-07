// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

Vue.config.productionTip = false

let app;
let config = {
    apiKey: "AIzaSyAvdHpLf9WAvbpzN72oYdFFWunxA03qk8M",
    authDomain: "badreviews-1c0c4.firebaseapp.com",
    databaseURL: "https://badreviews-1c0c4.firebaseio.com",
    projectId: "badreviews-1c0c4",
    storageBucket: "badreviews-1c0c4.appspot.com",
    messagingSenderId: "481022068097"
  };
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user){
  if(!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: {App},
      router
    })
  }
});
