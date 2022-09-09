import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class AppController {
  constructor() {}

  @Get()
  getHealth() {
    return { status: 'running', message: 'health ok' };
  }
}
