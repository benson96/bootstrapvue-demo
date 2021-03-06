import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from 'vue2-google-maps'
import vuetify from './plugins/vuetify';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.use(BootstrapVue)
Vue.use(VueGeolocation)
Vue.use(VuetifyGoogleAutocomplete,{
  apiKey: ''
})
Vue.use(VueGoogleMaps, {
  load:{
    key: ''
  }
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
