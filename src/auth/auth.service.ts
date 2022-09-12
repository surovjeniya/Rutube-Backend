import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import {
  EMAIL_ALREADY_USED,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  NAME_ALREADY_USED,
} from './const/auth.const';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export interface AuthResponse {
  accessToken: string;
}

export interface JwtPayload {
  username: string;
  email: string;
  isVerified: boolean;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const candidateEmail = await this.userService.getUserByEmail(dto.email);
    if (candidateEmail) {
      throw new HttpException(EMAIL_ALREADY_USED, HttpStatus.BAD_REQUEST);
    }
    const candidateName = await this.userService.getUserByName(dto.username);
    if (candidateName) {
      throw new HttpException(NAME_ALREADY_USED, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.createUser(dto);
    const token = this.generateAccessToken(user);
    return {
      accessToken: token,
    };
  }

  async login(dto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException(INVALID_EMAIL, HttpStatus.BAD_REQUEST);
    }
    const comparePassword = await compare(dto.password, user.password);
    if (!comparePassword)
      throw new HttpException(INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
    const token = this.generateAccessToken(user);
    return {
      accessToken: token,
    };
  }

  generateAccessToken({ username, id, email, isVerified }: UserEntity): string {
    const payload: JwtPayload = {
      username,
      id,
      email,
      isVerified,
    };
    return this.jwtService.sign(payload);
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verify(token);
  }
}
