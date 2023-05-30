import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MailServiceJob } from './mail.job.service';
import { PaisService } from 'src/pais/pais.service';
import { MailService } from '../mail.service';

@Module({
  providers: [MailServiceJob, PrismaService, PaisService, MailService],
})
export class MailJobModule {}
