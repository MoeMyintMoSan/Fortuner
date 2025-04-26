import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/schema/token.schema';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    ) {}

    async findOne(email: string) {
        return this.tokenModel
            .findOne({
                userEmail: email,
            })
            .exec();
    }

    async createdToeken(type: string, email: string): Promise<Number[]> {
        const randomizedToken = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
        const token = new this.tokenModel({ 
          token: randomizedToken , type: type, 
          expiresAt: new Date(Date.now() + 60 * 60 * 1000), userEmail: email });
        await token.save();
        return randomizedToken;
    }
}
