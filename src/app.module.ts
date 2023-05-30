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

@Module({
  imports: [
    PaisModule,
    PaisJobModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, PaisServiceJob, PaisService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly paisServiceJob: PaisServiceJob) {}

  async onModuleInit() {
    await this.paisServiceJob.getPaises();
  }
}
