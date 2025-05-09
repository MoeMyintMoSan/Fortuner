import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AppconfigModule } from 'src/appconfig/appconfig.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TokenModule } from 'src/token/token.module';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { AppconfigService } from 'src/appconfig/appconfig.service';
import * as path from 'path';
import { Token } from 'src/schema/token.schema';

@Module({
  providers: [EmailService],
  imports: [
    AppconfigModule,
    TokenModule,
    MailerModule.forRootAsync({
      imports: [AppconfigModule, TokenModule],
      inject: [AppconfigService],
      useFactory: async (configService: AppconfigService) => ({
        transport: {
          host: configService.getEmailHost(),
          port: configService.getEmailPort(),
          secure: false,
          auth: {
            user: configService.getEmailUser(),
            pass: configService.getEmailPass(),
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: path.join(process.cwd(), 'src', 'templates'),
          adapter: new PugAdapter({ inlineCssEnabled: true }),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  exports: [EmailService], // Export the EmailService so it can be used in other modules
})
export class EmailModule {}
