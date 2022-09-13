import { config } from 'dotenv';
config();

const [book, status, trades] = process.env.BITFINEX_CHANNEL.split(',');

const [precision0, precision1, precision2, precision3, precision4, raw0] =
  process.env.BITFINEX_PRECISION.split(',');

const [length1, length25, length100, length250] =
  process.env.BITFINEX_LENGTH.split(',');

const [frecuency0, frecuency1] = process.env.BITFINEX_FRECUENCY.split(',');

const [BTCUSD, ETHUSD] = process.env.BITFINEX_PAIR.split(',');

export const bitfinexData = {
  apiUrl: process.env.BITFINEX_WS_URL,
  ttl: 20,
};

export const pairNameBTCUSD = JSON.stringify({
  event: process.env.BITFINEX_EVENT,
  channel: book,
  symbol: 't'.concat(BTCUSD),
  prec: precision0,
  freq: frecuency1,
  len: Number(length25),
});

export const pairNameETHUSD = JSON.stringify({
  event: process.env.BITFINEX_EVENT,
  channel: book,
  symbol: 't'.concat(ETHUSD),
  prec: precision0,
  freq: frecuency1,
  len: Number(length25),
});

export const tradePairBTCUSD = JSON.stringify({
  event: process.env.BITFINEX_EVENT,
  channel: trades,
  symbol: 't'.concat(BTCUSD),
});

export const tradePairETHUSD = JSON.stringify({
  event: process.env.BITFINEX_EVENT,
  channel: trades,
  symbol: 't'.concat(ETHUSD),
});

export const allPairNamesChannels = {
  bookBTCUSD: 'book'.concat(BTCUSD),
  bookETHUSD: 'book'.concat(ETHUSD),
  tradesBTCUSD: 'trades'.concat(BTCUSD),
  tradesETHUSD: 'trades'.concat(ETHUSD),
};

export const allPairNames = {
  BTCUSD,
  ETHUSD,
};

export const hbValues = 'hb';
export const tradeState = {
  te: 'te',
  tu: 'tu',
};
export const typeOperation = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export const channel = {
  trades,
  book,
};
