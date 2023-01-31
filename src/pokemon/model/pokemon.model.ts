import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;
@Schema()
export class Pokemon {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [String], required: true })
  type: [string];
  @Prop({ type: String, required: true })
  imageURL: string;
  @Prop({ type: Number, required: true })
  pokedexId: number;
  @Prop({ type: Number, required: true })
  level: number;
  @Prop({ type: String, required: false })
  height?: number;
  @Prop({ type: Number, required: true })
  weight?: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
