import { Injectable } from '@nestjs/common';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import * as path from 'path';
import { IsEmail, isString } from 'class-validator';

class emailDto {
  @IsEmail()
  email: string;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerMain: MailerMain) {}

  async sendMail(email: string): Promise<void> {
    await this.mailerMain
      .sendMail({
        to: email,
        from: 'noelsi536@gmail.com',
        subject: 'Test Email',
        // html: '<h1>Test Email</h1>',
        template: path.join(process.cwd(), 'src', 'templates', 'template'),
        context: {
          name: 'Noel',
          codeDigits: ['1', '2', '3', '4'],
          year: new Date().getFullYear(),
        },
      })
      .then(() => {
        console.log('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }
}
