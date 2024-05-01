import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface LandscapingProjectsCreationAttributes {
  name: string;
  region: string;
  collection: string;
  areaYard: number;
  areaStreet: number;
  AYLawn: number;
  AYPerennials:number;
  AYPerennialsCF: number;
  AYPerennialsGL: number;
  AYShrubsStandartD: number;
  AYShrubsStandartC: number;
  AYShrubsAccent: number;
  AYShrubsAM: number;
  AYShrubsAH: number;
  AYHedge: number;
  AYHedgeM: number;
  AYHedgeH: number;
  AYHedgeA: number;
  AYTreesStandartD: number;
  AYTreesSDS: number;
  AYTreesSDM: number;
  AYTreesStandartC: number;
  AYTreesAccent: number;
  AYVines: number;
  AYMoldedTrees: number;
  ASLawn: number;
  ASPerennials:number;
  ASShrubsStandartD: number;
  ASShrubsStandartC: number;
  ASShrubsAccent: number;
  ASHedgeA: number;
  ASTreesStandartD: number;
  ASTreesSDS: number;
  ASTreesSDM: number;
  ASTreesAccent: number;
  ASTreesGiant: number;
}

@Table({ tableName: 'landscapingProjects' })
export class Room extends Model<Room, LandscapingProjectsCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1.1.1.1', description: 'Номер помещения' })
  @Column({ type: DataType.STRING, allowNull: false })
  number: string;

  @ApiProperty({
    example: 'Жилая комната',
    description: 'Наименование помещения',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '3.0', description: 'Высота фасадного модуля' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  height: number;

  @ApiProperty({ example: '3.45', description: 'Ширина фасадного модуля' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  width: number;

  @ApiProperty({ example: '3.45', description: 'Площадь стены' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  areaWall: number;

  @ApiProperty({ example: '3.45', description: 'Площадь окна' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  areaWindow: number;

  @ApiProperty({ example: '10.0', description: 'Площадь помещения' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  areaRoom: number;

  @ApiProperty({ example: 'Номер 1', description: 'Номер фасадного модуля' })
  @Column({ type: DataType.STRING, allowNull: false })
  numberFacade: string;

  @ApiProperty({ example: '550', description: 'Теплопотери' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  heatLoss: number;

//   @ForeignKey(() => Project)
//   @Column({ type: DataType.INTEGER })
//   projectId: number;

//   @BelongsTo(() => Project)
//   owner: Project;
}
