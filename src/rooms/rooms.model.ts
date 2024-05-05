import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Facade } from 'src/facades/facades.model';
import { Project } from 'src/projects/projects.model';
import { RoomFacade } from './room-facade.model';

interface RoomCreationAttrs {
  number: string;
  name: string;
  // height: number;
  // width: number;
  // areaWall: number;
  // areaWindow: number;
  areaRoom: number;
  // numberFacade: string;
  heatLoss?: number;
  projectId?: number;
  floor: number;
  // facades?: Facade[];
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({ example: '02', description: 'Этажность' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  floor: number;

  @ApiProperty({ example: '1.1.1.1', description: 'Номер помещения' })
  @Column({ type: DataType.STRING, allowNull: false })
  number: string;

  @ApiProperty({
    example: 'Жилая комната',
    description: 'Наименование помещения',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '10.0', description: 'Площадь помещения' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  areaRoom: number;

  @ApiProperty({ example: '550', description: 'Теплопотери' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  heatLoss: number;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project)
  owner: Project;
  
  @BelongsToMany(() => Facade, () => RoomFacade, 'roomId', 'facadeId')
  facades: Facade[];

}
