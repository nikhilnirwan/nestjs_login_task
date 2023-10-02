import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntiry, UserSchema } from './schema/user.schema';
import { models } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceToken } from '../book/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntiry.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'u1t4jbady12yjhg', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // You can customize the token expiration
    }),
  ],
  controllers: [UserController],
  providers: [UserEntiry, UserService, JwtServiceToken],
})
export class UserModule {}
