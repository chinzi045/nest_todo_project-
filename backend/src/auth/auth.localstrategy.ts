import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userservice: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user: User = await this.userservice.findByemail(email);
    // console.log(user, 'uuuuu');
    if (user === undefined)
      throw new UnauthorizedException('user is not registered at the:' + email);
    if (user.password !== password) throw new UnauthorizedException();

    if (user && user.password === password) {
      delete user.password;
      console.log(user, 'hhhhhh');
      return user;
    }
  }
}
