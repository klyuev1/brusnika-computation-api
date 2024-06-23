import {
  AfterDestroy,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Facade } from 'src/facades/facades.model';
import { Room } from 'src/rooms/rooms.model';

// Определение атрибутов и методов для таблицы-связи
@Table({ tableName: 'room_facades', createdAt: false, updatedAt: false })
export class RoomFacade extends Model<RoomFacade> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER })
  roomId: number;

  @ForeignKey(() => Facade)
  @Column({ type: DataType.INTEGER })
  facadeId: number;
}
