import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { ProjectElement } from '../landscaping-projects.model';

export class createProjectDto {

    @ApiProperty({ example: 'ПШЦ 2.1', description: 'Наименование проекта' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(2, 20, { message: 'Длина должна быть от 2 до 20 символов' })
    name: string;
    
    @ApiProperty({ example: 'Новосибирск', description: 'Регион' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(2, 20, { message: 'Длина должна быть от 2 до 20 символов' })
    region: string;
  
    @ApiProperty({ example: 'Scandinavia', description: 'Наименование коллекции' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(2, 20, { message: 'Длина должна быть от 2 до 20 символов' })
    collection: string;
  
    @ApiProperty({ example: '3.0', description: 'Площадь благоустройства двора' })
    areaYard: number;
  
    @ApiProperty({ example: '3.45', description: 'Площадь благоустройства улицы' })
    areaStreet: number;
}