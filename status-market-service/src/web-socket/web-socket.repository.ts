import {
  Injectable,
  CacheInterceptor,
  UseInterceptors,
  CacheTTL,
  CacheKey,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as WebSocket from 'ws';
import { bitfinexData, pairName } from '../environments/config';

@Injectable()
@UseInterceptors(CacheInterceptor)
@CacheTTL(30)
@CacheKey('pair-key')
export class WSRepository {
  private ws: WebSocket;
  private isConnect = false;
  private arrayMessage = [];
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  async connect(from: string, to: string) {
    this.ws = new WebSocket(bitfinexData.apiUrl);
    this.ws.on('open', async () => {
      this.isConnect = true;
      await this.ws.send(pairName(from, to));
    });

    this.ws.on('error', (message) => {
      this.ws.close();
      this.isConnect = false;
    });

    this.ws.on('close', (message) => {
      this.isConnect = false;
    });
  }
  async getDateWS() {
    this.ws.on('message', async (message) => {
      let messageParsed = JSON.parse(message.toString());

      this.arrayMessage.push(messageParsed[messageParsed.length - 1]);
      setTimeout(() => {
        this.ws.close();
      }, 2000);
      let id = messageParsed.length + Math.floor(Math.random() * 1000);
      await this.cacheService.set(
        id.toString(),
        messageParsed[messageParsed.length - 1],
      );
      const cachedData = await this.cacheService.get(id.toString());
      return this.arrayMessage;
    });
  }
  getIsConnect() {
    return this.isConnect;
  }
}
