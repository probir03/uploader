import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cat extends Document {
  @Prop()
  name: string;

  @Prop()
  url: string;

  @Prop()
  resizeUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);