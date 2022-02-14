const SOCKET_ENDPOINT = 'wss://hometask.eg1236.com/game1/';

class GameClient {
  private static _socket: any = null;

  public static get socket() {
    return this._socket;
  }

  public static set socket(socketConnection) {
    this._socket = socketConnection;
  }

  public static createConnection(url: string = SOCKET_ENDPOINT) {
    if (GameClient.socket) {
      return GameClient.socket;
    }
    const socketConnection = new WebSocket(url);
    GameClient.socket = socketConnection;
    return GameClient.socket;
  }
}

export {
  GameClient,
};
