import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: '1.1.1.1', description: 'Номер помещения' })
  @IsString({ message: 'Должно быть строкой' })
  readonly number: string;

  @ApiProperty({
    example: 'Жилая комната',
    description: 'Наименование помещения',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  // @ApiProperty({ example: '3.0', description: 'Высота фасадного модуля' })
  // @IsNumber({}, { message: 'Должно быть числом' })
  // readonly height: number;

  // @ApiProperty({ example: '3.45', description: 'Ширина фасадного модуля' })
  // @IsNumber({}, { message: 'Должно быть числом' })
  // readonly width: number;

  // @ApiProperty({ example: '3.45', description: 'Площадь стены' })
  // @IsNumber({}, { message: 'Должно быть числом' })
  // readonly areaWall: number;

  // @ApiProperty({ example: '3.45', description: 'Площадь окна' })
  // @IsNumber({}, { message: 'Должно быть числом' })
  // readonly areaWindow: number;

  @ApiProperty({ example: '10.0', description: 'Площадь помещения' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly areaRoom: number;

  // @ApiProperty({ example: 'Номер 1', description: 'Номер фасадного модуля' })
  // @IsString({ message: 'Должно быть строкой' })
  // readonly numberFacade: string;
}
