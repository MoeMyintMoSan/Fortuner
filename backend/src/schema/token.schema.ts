import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

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
