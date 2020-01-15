import store from '../store';

const socket_url = process.env.VUE_APP_PROXY_ORIGIN_MAIN_HOST;
const socket_prefix = process.env.VUE_APP_PROXY_ORIGIN_MAIN_WS_PREFIX;

class SocketIO {
  constructor() {
    this.connectTimer = 0;
    this.reconnectAttempts = 0; // 重连次数
    this.maxReconnectAttempts = 1000; // 最大重连次数
    this.ws = `ws://${socket_url}${socket_prefix}/dynamicData`;
    this.reconnetData = null;
    this.onopen = this.onopen.bind(this);
    this.onmessage = this.onmessage.bind(this);
    this.onerror = this.onerror.bind(this);
    this.onclose = this.onclose.bind(this);
    // SocketIO.$router = $router;
  }

  // static $router = null;
  static socket = null; // socket 对象
  static connented = false;

  init(isreconnent) {
    if (isreconnent && this.reconnectAttempts >= this.maxReconnectAttempts) {
      return false;
    }
    if (!socket_url) {
      return null;
    }
    SocketIO.socket = new WebSocket(this.ws);
    SocketIO.socket.onopen = this.onopen;
    SocketIO.socket.onmessage = this.onmessage;
    SocketIO.socket.onclose = this.onclose;
    SocketIO.socket.onerror = this.onerror;
    // return SocketIO.socket;
  }

  onopen() {
    clearTimeout(this.connectTimer);
    SocketIO.connented = true;
    this.reconnectAttempts = 0;
  }

  onmessage(evt) {
    let { data } = evt;
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log('信息类型不正确');
      return false;
    }
    store.dispatch('setWebsocketData', data);
    // switch (String(data.type)) {
    //     case 'msg':
    //         store.commit('ADD_NOTIFY', {
    //             count: 1,
    //             msgs: data.data
    //         });
    //         this.notice(data);
    //         break;
    // }
  }

  onerror() {
    clearTimeout(this.connectTimer);
    SocketIO.connented = false;
  }

  onclose() {
    clearTimeout(this.connectTimer);
    SocketIO.connented = false;
    if (this.reconnectAttempts === 0) {
      this.reconnetData = Date.now();
    }
    let interval = parseInt((Date.now() - this.reconnetData) / 1000);
    let timer = 60;
    if (interval < 10 * 60) {
      timer = 60;
    } else if (10 * 60 <= interval < 1 * 60 * 60) {
      timer = 5 * 60;
    } else {
      timer = 30 * 60;
    }
    // 重接
    // 10分钟内 每隔一分钟 重连一次 10*60 -> 60000
    // 1小时内 每隔5分钟 重连一次 1*60*60 -> 300000
    // 1小时之后 每隔半小时 重连一次  >1*60*60 -> 1800000
    this.connectTimer = window.setTimeout(() => {
      this.init(true);
      this.reconnectAttempts++;
    }, timer * 1000);
  }

  /**
   * 发送信息
   * @param {String|Number|Array|Object} 信息内容
   */
  send = (data) => {
    if (typeof data != 'string' && typeof data != 'number') {
      data = JSON.stringify(data);
    }
    SocketIO.socket.send(data);
  };
  /**
   * 断开连接
   */
  disconnect = () => {
    this.send('disconnent');
    SocketIO.socket.close();
    // store.commit('DELETE_NOTIFY', {count: 0, msgs: []});
    SocketIO.connented = false;
    this.reconnectAttempts = 1000;
  };
}

export default new SocketIO();
