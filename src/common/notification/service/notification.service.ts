import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendGrid from '@sendgrid/mail';
import { NotificationDto } from '../dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
    sendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmailNotification(
    payload: NotificationDto,
  ): Promise<[sendGrid.ClientResponse, {}]> {
    const mail: sendGrid.MailDataRequired = {
      to: payload.email,
      from: process.env.SENDGRID_VERIFY_EMAIL,
      subject: payload.subject,
      text: payload.message,
    };

    const transport = await sendGrid.send(mail);

    return transport;
  }
}