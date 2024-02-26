import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class LoginUserDto {
  @ApiProperty({example: 'user@email.com', description: 'Адрес почты'})
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({}, {message: 'Некорректная почта'})
  readonly email: string;

  @ApiProperty({example: '12345', description: 'Пароль пользователя'})
  @IsString({message: 'Должно быть строкой'})
  @Length(2, 30, {message: 'Не менее 2 и не более 30 символов'})
  readonly password: string;
}