import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { mockXHR } from '../mock';
import '../mock/ws';

Vue.config.productionTip = false;

mockXHR();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
