import { Injectable, Logger } from '@nestjs/common';
import * as WebSocket from 'ws';
import { timer } from 'rxjs';
import { bitfinexData, pairBTCUSD, pairETHUSD } from '../environments/config';
import { StatusMarketService } from '../market/status-market.service';

@Injectable()
export class WSRepository {
  private ws: WebSocket;
  private isConnect = false;

  constructor(private statusMarketService: StatusMarketService) {
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

    this.ws.on('message', async (message) => {
      Logger.verbose({ data: message.toString() });
      this.statusMarketService.getDataWS(message.toString());
    });
  }

  getIsConnect() {
    return this.isConnect;
  }
}
