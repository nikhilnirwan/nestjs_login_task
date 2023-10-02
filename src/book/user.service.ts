import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UserEntiry, UserSchema } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

// import { myFunction } from './dto/create-book.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntiry.name) private UserSchema: Model<UserEntiry>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<UserEntiry> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createBookDto.password,
      saltOrRounds,
    );
    console.log('hashPassword', hashPassword);

    const model = new this.UserSchema();
    model.firstName = createBookDto.firstName;
    model.lastName = createBookDto.lastName;
    model.email = createBookDto.email;
    model.gender = createBookDto.gender;
    model.password = hashPassword;
    return model.save();
  }

  findOne(id: string): Promise<UserEntiry> {
    return this.UserSchema.findById(id).exec();
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.UserSchema.updateOne(
      { _id: id },
      {
        firstName: updateBookDto.firstName,
        lastName: updateBookDto.lastName,
        email: updateBookDto.email,
        gender: updateBookDto.gender,
        password: updateBookDto.password,
      },
    ).exec();
  }

  remove(id: string) {
    return this.UserSchema.deleteOne({ _id: id }).exec();
  }

  async findAllData() {
    const data = this.UserSchema.find().lean().exec();
    return data;
  }

  async getById() {
    const result = await this.findAllData();
    console.log('result', result);
    const data = await this.UserSchema.findById(result[0]._id).lean().exec();
    return { result: result, data: data };
  }
}
