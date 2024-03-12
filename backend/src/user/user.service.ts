import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constants } from 'src/utils/constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly Userrespo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    let data = new User();
    data.firstName = createUserDto.firstName;
    data.lastName = createUserDto.lastName;
    data.email = createUserDto.email;
    data.password = createUserDto.password;
    data.role = Constants.Roles.USER_ROLE;

    const datatoreturn = await this.Userrespo.save(data);

    // console.log('data returned', datatoreturn);

    return {
      status: true,
      success: 'Successfully stored!',
    };
  }

  findAll() {
    return this.Userrespo.find();
  }

  findByemail(email: string) {
    return this.Userrespo.findOne({ where: { email: email } });
  }

  FindOnebyid(userId: number) {
    return this.Userrespo.findOneOrFail({ where: { id: userId } });
  }

  remove(id: number) {
    return this.Userrespo.delete(id);
  }
}
