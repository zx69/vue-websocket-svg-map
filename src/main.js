import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { mockXHR } from '../mock';
import wsmock from '../mock/ws';

Vue.config.productionTip = false;


// if (process.env.NODE_ENV === 'production') {
mockXHR();

// }

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
