import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportSerializer } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService extends PassportSerializer {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  serializeUser(user: User, done: (err: any, id?: any) => void): void {
    done(null, user.id);
  }

  async deserializeUser(id: number, done: (err: any, user?: any) => void): Promise<void> {
    const user = await this.userService.findOne(id);
    done(null, user);
  }
}
