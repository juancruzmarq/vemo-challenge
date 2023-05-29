import { Controller, Get } from '@nestjs/common';
import { PaisService } from './pais.service';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Get()
  async findAll() {
    return await this.paisService.findAll();
  }
}
