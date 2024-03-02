import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({example: 'Пшеница.03', description: 'Название проекта'})
  @IsString({message: 'Должно быть строкой'})
  readonly name: string;

  @ApiProperty({example: '-25', description: 'Температура уличная'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly tOutside: number;

  @ApiProperty({example: '20', description: 'Температура внутреннего воздуха'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly tInside: number;

  @ApiProperty({example: '1.0', description: 'Сопротивление теплопередачи от стены'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly rWall: number;
  
  @ApiProperty({example: '0.5', description: 'Сопротивление теплопередачи от окна'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly rWindow: number;
  
  @ApiProperty({example: '1.05', description: 'Добавочный коэфициент'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly beta: number;
  
  @ApiProperty({example: '10', description: 'Коэфициент бытовых теплопередач'})
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly kHousehold: number;
}