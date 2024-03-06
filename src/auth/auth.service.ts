import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';
import { RegistationUserDto } from 'src/users/dto/registation-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: RegistationUserDto) {
    const candidate = await this.userService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с такой почтой уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(userDto: LoginUserDto, res: Response) {
    const user = await this.validateUser(userDto);
    this.setCookie(res, user);
    return user;
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getByEmail(userDto.email);
    if (!user) {
      throw new BadRequestException({
        message: 'Некорректный емайл или пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  private async setCookie(res: Response, user: User) {
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    res.cookie('jwt', token, {
      sameSite: true,
      httpOnly: true,
    });
  }
}
