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
};
export const pairName = (from?: string, to?: string) => {
  const symbol = 't'.concat(from, to);
  return JSON.stringify({
    event: process.env.BITFINEX_EVENT,
    channel: book,
    symbol,
    prec: precision0,
    freq: frecuency1,
    len: Number(length25),
  });
};
