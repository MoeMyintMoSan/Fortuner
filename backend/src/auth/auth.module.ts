import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppconfigModule } from 'src/appconfig/appconfig.module';
import { AppconfigService } from 'src/appconfig/appconfig.service';
import { EmailModule } from 'src/email/email.module';
import { TokenModule } from 'src/token/token.module';
import { Token } from 'src/schema/token.schema';

@Module({
  imports: [
    AppconfigModule,
    UserModule,
    PassportModule,
    EmailModule,
    TokenModule,
    JwtModule.registerAsync({
      imports: [AppconfigModule],
      useFactory: async (configService: AppconfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: '15m' }, // Adjust the expiration time as needed
      }),
      inject: [AppconfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
