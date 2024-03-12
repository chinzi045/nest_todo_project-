import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { REQUEST } from "@nestjs/core";
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
// import { PassportModule } from "@nestjs/passport";
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login.dto';

@ApiTags('Login')
@Controller()
export class AuthController {
  constructor(private readonly jwtservice: JwtService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() logindto: LoginDto) {
    // here our user is authorized   now it's time to create the jwt tpken to verify the user for multiple route
    const user: User = req.user;
    const payload = {
      userId: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      role: user.role,
    };

    return { token: this.jwtservice.sign(payload) };
  }

  @Post('/verify')
  @UseGuards(AuthGuard('jwt'))
  verify(@Req() req) {
    if (req.user.role === 'admin') {
      return req.user;
    }

    throw new UnauthorizedException();
  }
}
