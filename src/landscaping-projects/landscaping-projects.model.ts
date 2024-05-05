import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

export interface ProjectElement {
  name: string
  B?: number;
  VMiddle?: number;
  H?: number;
  per: number;
  S: number;
  rate: number;
  N: string;
  Q: number;
  V: number;
}

interface LandscapingProjectsCreationAttributes {
  name: string;
  region: string;
  collection: string;
  areaYard: number;
  areaStreet: number;
  elements: ProjectElement[];
}

@Table({ tableName: 'landscapingProjects' })
export class LandscapingProject extends Model<LandscapingProject, LandscapingProjectsCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ПШЦ 2.1', description: 'Наименование проекта' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  
  @ApiProperty({ example: 'Новосибирск', description: 'Регион' })
  @Column({ type: DataType.STRING, allowNull: false })
  region: string;

  @ApiProperty({ example: 'Scandinavia', description: 'Наименование коллекции' })
  @Column({ type: DataType.STRING, allowNull: false })
  collection: string;

  @ApiProperty({ example: '3.0', description: 'Площадь благоустройства двора' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  areaYard: number;

  @ApiProperty({ example: '3.45', description: 'Площадь благоустройства улицы' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  areaStreet: number;

  @ApiProperty({ example: 'Газон рулонный', description: 'Элемент озеленения проекта' })
  @Column({ type:DataType.JSONB, allowNull: false })
  elements: ProjectElement[];

}
