import { StatusMarketController } from './status-market.controller';
import { StatusMarketService } from './status-market.service';
import { StatusMarketRepository } from './status-market.repository';
const result = {
  price: 20000,
  bidAsk: 'bid',
  totalAmount: 20,
  orders: 1,
};

const resultOrder = {
  amount: 20000,
  effectivePrice: 100,
  maxOrderLimitAmount: 20,
  limitPrice: 1000,
  operationType: 'buy',
};
const pair = {
  from: 'BTC',
  to: 'USD',
  limitPrice: 1000,
  operationType: 'buy',
  amount: 1000,
};

describe('StatusMarketController', () => {
  let statusMarketController: StatusMarketController;
  let statusMarketService: StatusMarketService;
  let statusMarketRepository: StatusMarketRepository;

  beforeEach(() => {
    statusMarketService = new StatusMarketService(statusMarketRepository);
    statusMarketController = new StatusMarketController(statusMarketService);
  });

  describe('Get Status Market by Pair', () => {
    it('should return an object', async () => {
      jest
        .spyOn(statusMarketService, 'getStatusMarket')
        .mockImplementation(async () => result);
    });
    it('should return data', async () => {
      jest
        .spyOn(statusMarketService, 'getStatusMarket')
        .mockImplementation(async () => result);

      expect(
        await statusMarketService.getStatusMarket(pair.from, pair.to),
      ).toBeDefined();
    });
    it('should return a key totalAmount', async () => {
      jest
        .spyOn(statusMarketService, 'getStatusMarket')
        .mockImplementation(async () => result);
      expect(
        await statusMarketService.getStatusMarket(pair.from, pair.to),
      ).toHaveProperty('totalAmount');
    });
    it('should return a key bidAsk', async () => {
      jest
        .spyOn(statusMarketService, 'getStatusMarket')
        .mockImplementation(async () => result);

      expect(
        await statusMarketService.getStatusMarket(pair.from, pair.to),
      ).toHaveProperty('bidAsk');
    });
  });
});
describe('Get Order buy or sell by Pair', () => {
  let statusMarketController: StatusMarketController;
  let statusMarketService: StatusMarketService;
  let statusMarketRepository: StatusMarketRepository;

  beforeEach(() => {
    statusMarketService = new StatusMarketService(statusMarketRepository);
    statusMarketController = new StatusMarketController(statusMarketService);
  });
  it('should return an object', async () => {
    jest
      .spyOn(statusMarketService, 'buySellPair')
      .mockImplementation(async () => resultOrder);
  });
  it('should return data', async () => {
    jest
      .spyOn(statusMarketService, 'buySellPair')
      .mockImplementation(async () => resultOrder);

    expect(
      await statusMarketService.buySellPair(
        pair.from,
        pair.to,
        pair.amount,
        pair.operationType,
        pair.limitPrice,
      ),
    ).toBeDefined();
  });
  it('should return a key operationType', async () => {
    jest
      .spyOn(statusMarketService, 'buySellPair')
      .mockImplementation(async () => resultOrder);

    expect(
      await statusMarketService.buySellPair(
        pair.from,
        pair.to,
        pair.amount,
        pair.operationType,
        pair.limitPrice,
      ),
    ).toHaveProperty('operationType');
  });
});
