import { bitfinexData } from '../../environments/config';
const WebSocket = require('ws');

export const bitfinexWSStart = async () => {
  const wss = new WebSocket(bitfinexData.apiUrl);
  let msg = JSON.stringify({
    event: 'subscribe',
    channel: 'book',
    symbol: 'tBTCUSD',
    prec: 'P3',
    freq: 'F1',
    len: 25,
  });
  wss.on('message', async msg => {
    console.log(msg.toString(), 'string');
    return await msg.toString();
  });

  wss.on('open', () => wss.send(msg));
};
