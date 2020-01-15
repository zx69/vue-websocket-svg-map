export default {
  setWebsocketData({ state, commit }, payload) {
    switch (payload.type) {
      case 'robot':
        commit({
            type: 'SET_ROBOT_DATA',
            data: payload.data,
            module: 'robot',
        });
        break;
      case 'board':
        commit({
          type: 'SET_BOARD_DATA',
          data: payload.data,
          module: 'board',
        });
        break;
      default:
        return;

    }
  },
};
