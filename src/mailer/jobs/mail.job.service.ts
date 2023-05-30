import { PaisService } from 'src/pais/pais.service';
import { MailService } from '../mail.service';
import { HttpException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Mail } from 'src/interfaces/mail.interface';
import { FILENAME, HTML, SUBJECT, TO } from 'src/constants';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailServiceJob {
  private logger = new Logger('MailServiceJob');
  constructor(
    private readonly paisService: PaisService,
    private readonly mailerService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_6PM) // Se envia todos los dias a las 6pm
  async sendEmail() {
    try {
      this.logger.log('Enviando correo');
      const excel = await this.paisService.getExcel();
      if (excel instanceof HttpException) {
        throw excel;
      }
      const buffer = await excel.xlsx.writeBuffer();

      const mail: Mail = {
        from: this.configService.get('SMTP_USERNAME'),
        to: TO,
        subject: SUBJECT,
        html: HTML,
        attachments: [
          {
            filename: FILENAME,
            content: buffer as Buffer,
          },
        ],
      };

      const result = await this.mailerService.sendEmail(mail);
      if (result instanceof HttpException) {
        throw result;
      }
      return result;
    } catch (error) {
      this.logger.error('Error al enviar el correo', error);
      return error;
    }
  }
}
