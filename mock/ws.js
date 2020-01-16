import wsm from 'wsmock-js';
import robotData from './data/robot';
import boardData from './data/board';

const socket_url = process.env.VUE_APP_PROXY_ORIGIN_MAIN_HOST;
const socket_prefix = process.env.VUE_APP_PROXY_ORIGIN_MAIN_WS_PREFIX;

let currentIndex = 0;

setInterval(() => {
  currentIndex++;
  if (currentIndex > robotData.length - 1) {
    currentIndex = 0;
  }
}, 1000);

let currentType = 'robot';

wsm.mock({
  url: `ws://${socket_url}${socket_prefix}/dynamicData`,
  // sendInterval: 'onreceive',
  sendInterval: 500,
  receiver(data) { // 'data' is sent by webSocket.send in browser
    console.log(data);
  },
  sender() { // Simulating server send
    if(currentType === 'robot'){
      this.response = JSON.stringify({
        type: 'robot',
        data: [robotData[currentIndex]],
      });
    }else{
      let currentBoard = JSON.parse(JSON.stringify(boardData));
      let currentRobot = robotData[currentIndex];
      if(currentRobot.withHolder){
        currentBoard[0].x = currentRobot.x;
        currentBoard[0].y = currentRobot.y;
        currentBoard[0].status = 'moving';
      }
      // console.log(JSON.stringify(currentBoard), JSON.stringify(currentRobot));
      this.response = JSON.stringify({
        type: 'board',
        data: currentBoard,
      });
    }

    currentType = currentType === 'robot' ? 'board' : 'robot';

  },
});
