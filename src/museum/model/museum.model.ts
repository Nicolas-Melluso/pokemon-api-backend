import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MuseumDocument = Museum & Document;
@Schema()
export class Museum {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [Number], required: true, default: [] })
  trunk: [number];
  @Prop({ type: String, required: true })
  owner: string;
}

export const MuseumSchema = SchemaFactory.createForClass(Museum);
