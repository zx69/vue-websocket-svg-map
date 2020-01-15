
let state = {
  robotsList: [],
};

let mutations = {
  SET_ROBOT_DATA(state, payload){
    state.robotsList = payload.data;
  },

};

let actions = {

};

export default {
  state,
  mutations,
  actions,
};
