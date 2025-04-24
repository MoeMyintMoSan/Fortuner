import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AppconfigModule } from 'src/appconfig/appconfig.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { AppconfigService } from 'src/appconfig/appconfig.service';

@Module({
  providers: [EmailService],
  imports: [
    AppconfigModule,
    MailerModule.forRootAsync({
      imports: [AppconfigModule],
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
        template: {
          dir: __dirname + '/templates',
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
