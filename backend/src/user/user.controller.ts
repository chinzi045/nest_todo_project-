import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/customGuards/Uthorization.gurad';
import { Constants } from 'src/utils/constant';
import { ApiTags } from '@nestjs/swagger';
import { ApiSecurity } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/findall')
  @ApiSecurity('JWT-auth')
  // @UseGuards( RoleGuard)
  @UseGuards(new RoleGuard(Constants.Roles.ADMIN_ROLE))
  findAll() {
    // console.log(req,"uuuuuuuuuu")
    return this.userService.findAll();
  }

  @Get('/getsingle')
  findByemail(email: string) {
    return this.userService.findByemail(email);
  }

  @Delete('/delete/:id')
  @ApiSecurity('JWT-auth')
  @UseGuards(new RoleGuard(Constants.Roles.ADMIN_ROLE))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
