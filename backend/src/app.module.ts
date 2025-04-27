import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppconfigModule } from './appconfig/appconfig.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AppconfigService } from './appconfig/appconfig.service';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';

// to be configed with redis later

@Module({
  imports: [
    AppconfigModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    CacheModule.register({
      isGlobal: true,
    }),
    EmailModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
