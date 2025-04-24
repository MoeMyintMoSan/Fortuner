import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppconfigModule } from 'src/appconfig/appconfig.module';
import { AppconfigService } from 'src/appconfig/appconfig.service';

@Module({
  imports: [
    AppconfigModule,
    UserModule,
    PassportModule,
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
