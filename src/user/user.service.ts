import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: UserDto): Promise<User> {
    try {
      const user = await this.userModel.create(userData);
      return user;
    } catch (error) {
      if (error && error.code === 11000) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: ['Username already exists'],
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      } else {
        throw error;
      }
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
