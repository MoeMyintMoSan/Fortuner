import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppconfigModule } from 'src/appconfig/appconfig.module';
import { AppconfigService } from 'src/appconfig/appconfig.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppconfigModule],
      useFactory: async (configService: AppconfigService) => ({
        uri: configService.getMongoDBURL(),
      }),
      inject: [AppconfigService],
    }),
  ],
})
export class DatabaseModule {}
