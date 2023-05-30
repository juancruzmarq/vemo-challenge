import { Module } from '@nestjs/common';
import { PaisServiceJob } from './pais.job.service';
import { PaisService } from 'src/pais/pais.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PaisServiceJob, PaisService, PrismaService],
})
export class PaisJobModule {}
