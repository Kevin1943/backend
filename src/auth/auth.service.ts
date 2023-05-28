import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  private signJwtService(user: User): { access_token: string } {
    const payload = { username: user.username, userId: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);

    const isComparedPassword = await bcrypt.compare(password, user.password);
    if (user && isComparedPassword) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    return this.signJwtService(user);
  }

  async signup(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const { username, email, password } = signUpDto;
    const hashedPassowrd = await bcrypt.hash(password, 10);

    const user = await this.userService.create({ username, email, password: hashedPassowrd });

    return this.signJwtService(user);
  }
}
