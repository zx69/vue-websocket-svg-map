
let state = {
  boardsList: [],
};

let mutations = {
  SET_BOARD_DATA(state, payload){
    state.boardsList = payload.data;
  },

};

let actions = {

};

export default {
  state,
  mutations,
  actions,
};
