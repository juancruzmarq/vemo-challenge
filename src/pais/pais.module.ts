import { Module } from '@nestjs/common';
import { PaisController } from './pais.controller';
import { PaisService } from './pais.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PaisController],
  providers: [PaisService, PrismaService],
})
export class PaisModule {}
