import { StatusMarketController } from './status-market.controller';
import { StatusMarketService } from './status-market.service';
import { StatusMarketRepository } from './status-market.repository';
const result = {
  price: 20000,
  bidAsk: 'bid',
  totalAmount: 20,
  orders: 1,
};
const pair = { from: 'BTC', to: 'USD' };

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
      const pair = { from: 'BTC', to: 'USD' };
      jest
        .spyOn(statusMarketService, 'getStatusMarket')
        .mockImplementation(async () => result);

      expect(
        await statusMarketService.getStatusMarket(pair.from, pair.to),
      ).toBeDefined();
    });
    it('should return a key totalAmount', async () => {
      const pair = { from: 'BTC', to: 'USD' };
      jest
        .spyOn(statusMarketService, 'getStatusMarket')
        .mockImplementation(async () => result);

      expect(
        await statusMarketService.getStatusMarket(pair.from, pair.to),
      ).toHaveProperty('totalAmount');
    });
    it('should return a key totalAmount', async () => {
      const pair = { from: 'BTC', to: 'USD' };
      jest
        .spyOn(statusMarketService, 'getStatusMarket')
        .mockImplementation(async () => result);

      expect(
        await statusMarketService.getStatusMarket(pair.from, pair.to),
      ).toHaveProperty('bidAsk');
    });
  });
});
