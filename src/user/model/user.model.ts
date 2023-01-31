import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [String], required: true })
  pokemonTrunks: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
