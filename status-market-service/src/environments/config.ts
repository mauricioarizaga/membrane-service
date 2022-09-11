import { config } from 'dotenv';
config();
const [precision0, precision1, precision2, precision3, precision4] =
  process.env.BITFINEX_PRECISION.split(',');

const [length1, length25, length100, length250] =
  process.env.BITFINEX_LENGTH.split(',');

const [frecuency0, frecuency1] = process.env.BITFINEX_FRECUENCY.split(',');

const [BTCUSD, ETHUSD] = process.env.BITFINEX_PAIR.split(',');

export const bitfinexData = {
  apiUrl: process.env.BITFINEX_WS_URL,
};
export const pairBTCUSD = JSON.stringify({
  event: process.env.BITFINEX_EVENT,
  channel: process.env.BITFINEX_CHANNEL,
  symbol: 't'.concat(BTCUSD),
  prec: precision3,
  freq: frecuency1,
  len: Number(length25),
});
export const pairETHUSD = JSON.stringify({
  event: process.env.BITFINEX_EVENT,
  channel: process.env.BITFINEX_CHANNEL,
  symbol: 't'.concat(ETHUSD),
  prec: precision2,
  freq: frecuency1,
  len: Number(length100),
});
export const arrayDataWS = [];