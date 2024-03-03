import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class createFacadeDto {
  @ApiProperty({ example: 'Фасад 1', description: 'Наименование фасада' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 20, { message: 'Длина должна быть от 2 до 20 символов' })
  readonly name: string;

  @ApiProperty({ example: '3000', description: 'Высота фасада в мм' })
  // @IsNumber({},{message:'Должно быть числом'})
  readonly height: number;

  @ApiProperty({ example: '3000', description: 'Длина фасада в мм' })
  // @IsNumber({},{message:'Должно быть числом'})
  readonly width: number;

  @ApiProperty({ example: '2.5', description: 'Площадь стены в м2' })
  // @IsNumber({},{message:'Должно быть числом'})
  readonly areaWall: number;

  @ApiProperty({ example: '2.5', description: 'Площадь стены в м2' })
  // @IsNumber({},{message:'Должно быть числом'})
  readonly areaWindow: number;
}
