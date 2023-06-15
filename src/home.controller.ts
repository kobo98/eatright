import { Controller, Get } from '@nestjs/common';
import { HomeService as HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly appService: HomeService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
