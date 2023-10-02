// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongoSchema, Types, Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'user' })
export class UserEntiry {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  designation: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  salary: string;

  @Prop()
  gender: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntiry);
