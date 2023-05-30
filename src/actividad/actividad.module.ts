import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { PrismaService } from 'src/prisma.service';
import { PaisService } from 'src/pais/pais.service';

@Module({
  providers: [ActividadService, PrismaService, PaisService],
  controllers: [ActividadController],
})
export class ActividadModule {}
