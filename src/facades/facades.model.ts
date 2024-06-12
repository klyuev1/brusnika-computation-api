import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoomFacade } from 'src/rooms/room-facade.model';
import { Room } from 'src/rooms/rooms.model';

interface FacadeCreationAttributes {
  name: string;
  link: string;
  height: number;
  width: number;
  areaWall: number;
  areaWindow: number;
}

@Table({ tableName: 'facades' })
export class Facade extends Model<Facade, FacadeCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор фасада' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Фасад 1', description: 'Наименование фасада' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'image1.png',
    description: 'Изображение в формате png',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @ApiProperty({ example: '3000', description: 'Высота фасада в мм' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  height: number;

  @ApiProperty({ example: '3000', description: 'Длина фасада в мм' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  width: number;

  @ApiProperty({ example: '2.5', description: 'Площадь стены в м2' })
  @Column({ type: DataType.FLOAT })
  areaWall: number;

  @ApiProperty({ example: '2.5', description: 'Площадь стены в м2' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  areaWindow: number;

  @BelongsToMany(() => Room, () => RoomFacade)
  rooms: Room[];
}
