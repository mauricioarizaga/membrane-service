import { config } from 'dotenv';
config();

const [book, status] = process.env.BITFINEX_CHANNEL.split(',');

const [precision0, precision1, precision2, precision3, precision4, raw0] =
  process.env.BITFINEX_PRECISION.split(',');

const [length1, length25, length100, length250] =
  process.env.BITFINEX_LENGTH.split(',');

const [frecuency0, frecuency1] = process.env.BITFINEX_FRECUENCY.split(',');

const [BTCUSD, ETHUSD] = process.env.BITFINEX_PAIR.split(',');

export const bitfinexData = {
  apiUrl: process.env.BITFINEX_WS_URL,
  ttl: 10,
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
export const allPairNames = {
  BTCUSD,
  ETHUSD,
};
export const hbValues = 'hb';
