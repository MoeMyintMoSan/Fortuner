import { Injectable } from '@nestjs/common';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import { TokenService } from 'src/token/token.service';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IsEmail, isString } from 'class-validator';
import { Token } from 'src/schema/token.schema';

class emailDto {
  @IsEmail()
  email: string;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerMain: MailerMain, 
    private readonly tokenService: TokenService,
  ) {}

  async sendMail(email: string): Promise<void> {
    const randomizedToken = await this.tokenService.createdToeken( 'EMAIL_VERIFICATION' , email );
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
