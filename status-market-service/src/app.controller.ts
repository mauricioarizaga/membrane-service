import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  getRoot() {
    return { status: 'running', message: '@Membrane' };
  }
}
