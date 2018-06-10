// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import store from '@/store/store';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io';

import 'vuetify/dist/vuetify.min.css';
import router from './router';
import * as constants from './constants';

Vue.use(VeeValidate);
Vue.use(Vuetify);

console.log("process.env.socketUrl", process.env.socketUrl);
const socket = io(process.env.socketUrl);
Vue.use(VueSocketio, socket);

Vue.config.productionTip = false;

store.subscribe((mutation, state) => {
  if (mutation.type === "addSymbol") {
    localStorage.setItem(constants.stockSymbolsKey, JSON.stringify(state.symbols));
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeDestroy() {
    console("before Destroy");
    this.$socket.close();
  },
  components: {
    App
  },
  template: '<App/>'
});
