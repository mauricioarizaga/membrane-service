import { config } from 'dotenv';
config();

export const bitfinexData = {
  apiUrl: process.env.BITFINEX_WS_URL,
  apiKey: process.env.BITFINEX_API_KEY,
  apiSecret: process.env.BITFINEX_API_SECRET,
  chanId: 0,
  type: process.env.BITFINEX_ORDER_TYPE,
};
