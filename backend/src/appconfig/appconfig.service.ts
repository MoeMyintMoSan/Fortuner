import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppconfigService {
  constructor(private readonly configService: ConfigService) {}

  getMongoDBURL() {
    return this.configService.get<string>('DATABASE_URL');
  }

  getRedisURL() {
    return this.configService.get<string>('REDIS_SERVER_URL');
  }

  getJwtSecret() {
    return this.configService.get<string>('JWT_SECRET');
  }
  getEmailHost() {
    return this.configService.get<string>('EMAIL_HOST');
  }

  getEmailUser() {
    return this.configService.get<string>('EMAIL_USER');
  }

  getEmailPass() {
    return this.configService.get<string>('EMAIL_PASS');
  }

  getEmailPort() {
    return this.configService.get<number>('EMAIL_PORT');
  }
}
