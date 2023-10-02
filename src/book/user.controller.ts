import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtServiceToken } from './jwt.service';
import { UserEntiry, UserSchema } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

@Controller('users')
export class UserController {
  constructor(
    @InjectModel(UserEntiry.name) private UserSchema: Model<UserEntiry>,
    private readonly UserService: UserService,
    private readonly jwtgenerate: JwtServiceToken,
  ) {}

  @Post('/signup')
  create(@Body() createBookDto: CreateBookDto) {
    try {
      return this.UserService.create(createBookDto);
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException(error);
    }
  }

  @Get('/getall')
  findAll() {
    try {
      return this.UserService.findAllData();
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException(error);
    }
  }

  @Get('me/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.UserService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException(error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return this.UserService.update(id, updateBookDto);
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.UserService.remove(id);
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException(error);
    }
  }

  @Post('/login')
  async login(
    @Body() body: { email: string; password: any },
  ): Promise<{ token: string }> {
    try {
      const { email, password } = body;
      let details: any = await this.UserSchema.findOne({ email: email });

      const comparePass = await bcrypt.compare(password, details?.password);
      if (comparePass) {
        let token = await this.jwtgenerate.generateToken(email);
        const user = {
          details: details,
          token: token,
        };
        return user;
      } else {
        throw new UnprocessableEntityException({
          message: 'Your email and password id wrong.',
        });
      }
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Get('/random-joke')
  async randomJoke() {
    try {
      var config = {
        method: 'get',
        url: 'https://api.chucknorris.io/jokes/random',
        headers: {},
      };

      const response = await axios(config);
      return response.data;
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException(error);
    }
  }
}
