import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // async findAll() {
  //   const users = await this.userModel.find({});
  //   return `This action returns all user`;
  // }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} user`;
  // }
}
