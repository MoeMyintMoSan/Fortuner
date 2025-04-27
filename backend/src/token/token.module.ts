import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { AppconfigModule } from 'src/appconfig/appconfig.module';
import { Token,TokenSchema } from 'src/schema/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        AppconfigModule,
        MongooseModule.forFeature([{name: Token.name, schema: TokenSchema }]),
    ],
    providers: [TokenService],
    exports: [TokenService],

})
export class TokenModule {}
