import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token {
  @Prop({ type: String, ref: 'User', required: true })
  userEmail: string;

  @Prop({ type: String, required: true })
  token: string;

  @Prop({
    type: String,
    required: true,
    enum: ['FORGOT_PASSWORD', 'EMAIL_VERIFICATION'],
  })
  type: 'FORGOT_PASSWORD' | 'EMAIL_VERIFICATION';

  @Prop({ type: Date, required: true })
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
