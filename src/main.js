// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import VueMultianalytics from 'vue-multianalytics'
import VueFire from 'vuefire'
import {firebaseConfig} from './firebaseConfig';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VModal);
Vue.use(VueFire)

let app;

firebaseConfig.auth().onAuthStateChanged(function(user){
  if(!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: {App},
      router
    })
  }
});

let mixpanelConfig = {
  token: 'd67b0a567c1dc07580eac502df3bbb78 '
}

Vue.use(VueMultianalytics, {
  modules: {
    mixpanel: mixpanelConfig
  }
})
