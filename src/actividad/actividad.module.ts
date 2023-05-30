import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ActividadService, PrismaService],
  controllers: [ActividadController],
})
export class ActividadModule {}
