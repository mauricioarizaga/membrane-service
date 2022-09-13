# Membrane APACHE Gateway

## Docker

```
docker compose  -f "docker-compose.yml" up --build apache status-market-service

```

## Variables de Entorno

API_PORT=

REDIS_PORT =

STATUS_MARKET_PORT=

STATUS_MARKET_HOST=status-market-service

#BitFinex
BITFINEX_WS_URL= 

BITFINEX_CHANNEL=book,status,trades

BITFINEX_EVENT=subscribe

BITFINEX_FRECUENCY=F0,F1

BITFINEX_PRECISION=P0,P1,P2,P3,P4,R0

BITFINEX_LENGTH=1,25,100,250

BITFINEX_PAIR=BTCUSD,ETHUSD


#REDIS

REDIS_HOST = cache

REDIS_PORT = 6379

REDIS_PASSWORD= 
