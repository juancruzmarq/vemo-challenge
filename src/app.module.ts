import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaisModule } from './pais/pais.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PaisJobModule } from './pais/jobs/pais.job.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PaisServiceJob } from './pais/jobs/pais.job.service';
import { PaisService } from './pais/pais.service';

import { MailService } from './mailer/mail.service';
import { MailModule } from './mailer/mail.module';
import { MailJobModule } from './mailer/jobs/mail.job.module';
import { ActividadModule } from './actividad/actividad.module';

@Module({
  imports: [
    PaisModule,
    MailModule,
    MailJobModule,
    PaisJobModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ActividadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    PaisServiceJob,
    PaisService,
    MailService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly paisServiceJob: PaisServiceJob) {}

  async onModuleInit() {
    await this.paisServiceJob.getPaises();
  }
}
