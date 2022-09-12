import { Injectable } from '@nestjs/common';
import { Inject, CACHE_MANAGER } from '@nestjs/common';
import Cache from 'cache-manager';
import { timer } from 'rxjs';
import * as WebSocket from 'ws';
import {
  allPairNames,
  bitfinexData,
  pairNameBTCUSD,
  pairNameETHUSD,
} from '../environments/config';
let chanIdBTCUSD: number;
let chanIdETHUSD: number;
@Injectable()
export class WSRepository {
  private ws: WebSocket;
  private isConnect = false;
  private arrayMessageBTCUSD = [];
  private arrayMessageETHUSD = [];

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.connect();
  }
  async connect() {
    this.ws = new WebSocket(bitfinexData.apiUrl);
    this.ws.on('open', async () => {
      this.isConnect = true;
      await this.ws.send(pairNameBTCUSD);
      await this.ws.send(pairNameETHUSD);
    });
    this.ws.on('message', async (message) => {
      let messageParsed = JSON.parse(message.toString());
      if (messageParsed.chanId && messageParsed.pair === allPairNames.BTCUSD) {
        chanIdBTCUSD = Number(messageParsed.chanId);
      }
      if (messageParsed.chanId && messageParsed.pair === allPairNames.ETHUSD) {
        chanIdETHUSD = Number(messageParsed.chanId);
      }
      if (
        Array.isArray(messageParsed) &&
        messageParsed.includes(chanIdBTCUSD)
      ) {
        this.arrayMessageBTCUSD.push(messageParsed[messageParsed.length - 1]);
        await this.cacheManager.set(
          allPairNames.BTCUSD,
          this.arrayMessageBTCUSD,
          {
            ttl: 10000,
          },
        );
      }
      if (
        Array.isArray(messageParsed) &&
        messageParsed.includes(chanIdETHUSD)
      ) {
        this.arrayMessageETHUSD.push(messageParsed[messageParsed.length - 1]);
        await this.cacheManager.set(
          allPairNames.ETHUSD,
          this.arrayMessageETHUSD,
          {
            ttl: 10000,
          },
        );
      }
    });
    this.ws.on('error', (message) => {
      timer(1000).subscribe(() => {
        this.isConnect = false;
        this.connect();
      });
    });
    this.ws.on('close', (message) => {
      this.isConnect = false;
    });
  }
}
