import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import map from './modules/map';
import robot from './modules/robot';
import board from './modules/board';


Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {},
  modules: {
    map,
    robot,
    board,
  },
});
