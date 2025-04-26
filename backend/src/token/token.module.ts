import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { AppconfigModule } from 'src/appconfig/appconfig.module';
import { AppconfigService } from 'src/appconfig/appconfig.service'

@Module({
    imports: [
        AppconfigModule,
    ],
    providers: [TokenService],

})
export class TokenModule {}
