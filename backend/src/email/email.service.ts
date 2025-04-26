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
    const randomizedToken = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    await this.mailerMain
      .sendMail({
        to: email,
        from: 'noelsi536@gmail.com',
        subject: 'Test Email',
        // html: '<h1>Test Email</h1>',
        template: path.join(process.cwd(), 'src', 'templates', 'template'),
        context: {
          name: 'Noel',
          codeDigits: randomizedToken,
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
