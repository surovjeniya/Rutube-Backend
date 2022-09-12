import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({ ...dto });
    return await this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUserByName(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async updateUser(dto: UpdateUserDto) {
    const registeredEmail = await this.getUserByEmail(dto.email);
    const registeredName = await this.getUserByName(dto.username);
  }
}
