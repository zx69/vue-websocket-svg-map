import Vue from 'vue';

export default {
  // 切换Loading状态
  CHANGE_LOADING_STATUS(state, shown) {
    Vue.nextTick(() => {
      state.loading = shown;
    });
  },

};

