import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);

    // TODO : decrypt password if resgister with encrypt
    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
