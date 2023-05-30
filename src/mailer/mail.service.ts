import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Mail } from 'src/interfaces/mail.interface';

@Injectable()
export class MailService {
  private logger = new Logger('MailService');
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mail: Mail): Promise<boolean | HttpException> {
    try {
      await this.mailerService.sendMail({
        to: mail.to,
        from: mail.from,
        subject: mail.subject,
        html: mail.html,
        attachments: [
          {
            filename: mail.attachments[0].filename,
            content: mail.attachments[0].content,
          },
        ],
      });
      this.logger.log('Correo enviado');
      return true;
    } catch (error) {
      this.logger.error('Error al enviar el correo', error);
      return new HttpException(
        'Error al enviar el correo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
