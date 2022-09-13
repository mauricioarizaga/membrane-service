import { Injectable } from '@nestjs/common';
import { Inject, CACHE_MANAGER } from '@nestjs/common';
import Cache from 'cache-manager';
import { channel } from '../environments/config';
import { timer } from 'rxjs';
import * as WebSocket from 'ws';
import {
  allPairNames,
  allPairNamesChannels,
  bitfinexData,
  pairNameBTCUSD,
  pairNameETHUSD,
  tradePairBTCUSD,
  tradePairETHUSD,
} from '../environments/config';
let chanIdBTCUSD: number;
let chanIdETHUSD: number;
let chanIdTradesBTCUSD: number;
let chanIdTradesETHUSD: number;
const dataTradesBTCUSD = [];
const dataTradesETHUSD = [];
@Injectable()
export class WSRepository {
  private ws: WebSocket;
  private isConnect = false;
  private oneMs = 1000;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.connect();
  }
  async connect() {
    this.ws = new WebSocket(bitfinexData.apiUrl);
    this.ws.on('open', async () => {
      this.isConnect = true;
      await this.ws.send(pairNameBTCUSD);
      await this.ws.send(pairNameETHUSD);
      await this.ws.send(tradePairBTCUSD);
      await this.ws.send(tradePairETHUSD);
    });
    this.ws.on('message', async (message) => {
      let messageParsed = JSON.parse(message.toString());

      if (
        messageParsed.chanId &&
        messageParsed.pair === allPairNames.BTCUSD &&
        messageParsed.channel === channel.book
      ) {
        chanIdBTCUSD = Number(messageParsed.chanId);
      }
      if (
        Array.isArray(messageParsed) &&
        messageParsed.includes(chanIdBTCUSD)
      ) {
        await this.cacheManager.set(
          allPairNamesChannels.bookBTCUSD,
          messageParsed[messageParsed.length - 1],
          {
            ttl: bitfinexData.ttl,
          },
        );
      }

      if (
        messageParsed.chanId &&
        messageParsed.pair === allPairNames.ETHUSD &&
        messageParsed.channel === channel.book
      ) {
        chanIdETHUSD = Number(messageParsed.chanId);
      }

      if (
        Array.isArray(messageParsed) &&
        messageParsed.includes(chanIdETHUSD)
      ) {
        await this.cacheManager.set(
          allPairNamesChannels.bookETHUSD,
          messageParsed[messageParsed.length - 1],
          {
            ttl: bitfinexData.ttl,
          },
        );
      }

      if (
        messageParsed.chanId &&
        messageParsed.pair === allPairNames.BTCUSD &&
        messageParsed.channel === channel.trades
      ) {
        chanIdTradesBTCUSD = Number(messageParsed.chanId);
      }
      if (
        Array.isArray(messageParsed) &&
        messageParsed.includes(chanIdTradesBTCUSD)
      ) {
        await this.cacheManager.set(
          allPairNamesChannels.tradesBTCUSD,
          messageParsed,
          {
            ttl: bitfinexData.ttl,
          },
        );
      }

      if (
        messageParsed.chanId &&
        messageParsed.pair === allPairNames.ETHUSD &&
        messageParsed.channel === channel.trades
      ) {
        chanIdTradesETHUSD = Number(messageParsed.chanId);
      }
      if (
        Array.isArray(messageParsed) &&
        messageParsed.includes(chanIdTradesETHUSD)
      ) {
        await this.cacheManager.set(
          allPairNamesChannels.tradesETHUSD,
          messageParsed,
          {
            ttl: bitfinexData.ttl,
          },
        );
      }
    });
    this.ws.on('error', (message) => {
      timer(this.oneMs).subscribe(() => {
        this.isConnect = false;
        this.connect();
      });
    });
    this.ws.on('close', (message) => {
      this.isConnect = false;
    });
  }
}
