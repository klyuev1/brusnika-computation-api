import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegistationUserDto } from 'src/users/dto/registation-user.dto';
import { Response } from 'express';

@ApiTags('Авторизация')
@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Регистрация пользователя'})
  @ApiResponse({status: 200, type: [User]})
  @Post('/signup')
  registration(@Body() userDto: RegistationUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({summary: 'Авторизация пользователя'})
  @ApiResponse({status: 200, type: [User]})
  @Post('/signin')
  login(@Body() userDto: LoginUserDto, @Res({passthrough: true}) res: Response): Promise<any> {
    return this.authService.login(userDto, res);
  }
  
  @ApiOperation({summary: 'Выход из аккаунта'})
  @ApiResponse({status: 200, type: 'message'})
  @Post('/signout')
  signOut(@Res() res: Response) {
    res.clearCookie('jwt').send({ message: 'See you soon'})
  }
}
