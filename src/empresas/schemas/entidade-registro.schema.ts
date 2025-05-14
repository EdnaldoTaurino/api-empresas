import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EntidadeRegistro extends Document {
  @Prop({ required: true })
  key: number;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  declare id: string;
}

export const EntidadeRegistroSchema =
  SchemaFactory.createForClass(EntidadeRegistro);
