import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TitleService } from "../title.service";
import { WebSocketAPI } from "./WebSocketAPI";
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  webSocketAPI = new WebSocketAPI();
  webSoket = webSocket('ws://localhost:8080/ws');
  greeting: any;

  ngOnInit() {
    this.connect()
  }

  connect() {
    this.webSocketAPI.connect();
    setTimeout(() => this.webSocketAPI.subscribe(), 3000);
  }

  disconnect() {
    this.webSocketAPI.disconnect();
  }

  sendMessage() {
    // this.webSocketAPI.publish()
    this.webSocketAPI.send("Send")
  }

  handleMessage(s: string) {
    console.log("message", s)
  }


  title = 'angular8-springboot-websocket';

}
