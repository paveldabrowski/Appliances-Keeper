import { Client } from '@stomp/stompjs';

export class WebSocketAPI {
  webSocketEndPoint = 'ws://localhost:8080/ws';
  topic: string = '/topic/greetings';
  stompClient: any;

  connect() {
    console.log('Initialize WebSocket Connection');
    this.stompClient = new Client({
      brokerURL: this.webSocketEndPoint,
    });

    this.stompClient.onConnect = function (frame: any) {
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      console.log("conecteed", frame)
    };
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  send(message: any) {
    console.log("calling logout api via web socket");
    this.stompClient.publish({ destination: '/app/hello', body: 'Hello world' });
  }

  publish() {
    this.stompClient.publish({destination: this.topic, body: 'Hello world'});
  }

  subscribe() {
    const callback = function (message: any) {
      // called when the client receives a STOMP message from the server
      if (message.body) {
        alert('got message with body ' + message.body);
      } else {
        alert('got empty message');
      }
    };
    console.log(this.stompClient)
    return this.stompClient.subscribe('/topic/greetings', callback);
  }
}
