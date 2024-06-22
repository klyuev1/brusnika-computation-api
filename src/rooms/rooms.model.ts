import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Project } from '../projects/projects.model';

interface RoomCreationAttrs {
  number: string;
  name: string;
  height: number;
  width: number;
  areaWall: number;
  areaWindow: number;
  areaRoom: number;
  numberFacade: string;
  heatLoss?: number;
  projectId?: number;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttrs> {
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

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project)
  owner: Project;
}
