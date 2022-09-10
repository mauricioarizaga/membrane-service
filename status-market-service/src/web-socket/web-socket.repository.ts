import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';
import { timer } from 'rxjs';
import { bitfinexData, pairBTCUSD, pairETHUSD } from '../environments/config';

@Injectable()
export class WSRepository {
  private ws: WebSocket;
  private isConnect = false;

  constructor() {
    this.connect();
  }
  connect() {
    this.ws = new WebSocket(bitfinexData.apiUrl);
    this.ws.on('open', () => {
      this.isConnect = true;
      console.log(pairBTCUSD, pairETHUSD);
      this.ws.send(pairBTCUSD);
      this.ws.send(pairETHUSD);
    });

    this.ws.on('error', (message) => {
      this.ws.close();
      this.isConnect = false;
    });

    this.ws.on('close', (message) => {
      timer(1000).subscribe(() => {
        this.isConnect = false;
        this.connect();
      });
    });

    this.ws.on('message', (message) => {
      console.log(message.toString());
    });
  }

  getIsConnect() {
    return this.isConnect;
  }
}
