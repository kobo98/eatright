import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from '../src/home.controller';
import { HomeService } from '../src/home.service';

describe('AppController', () => {
  let appController: HomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeService],
    }).compile();

    appController = app.get<HomeController>(HomeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
