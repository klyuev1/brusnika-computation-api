import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Room } from 'src/rooms/rooms.model';
import { User } from 'src/users/users.model';

interface ProjectCreationAttrs {
  name: string;
  tOutside: number;
  tInside: number;
  rWall: number;
  rWindow: number;
  beta: number;
  kHousehold: number;
  userId?: string;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Пшеница.03', description: 'Название проекта' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '-25', description: 'Температура уличная' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  tOutside: number;

  @ApiProperty({
    example: '20',
    description: 'Температура внутреннего воздуха',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  tInside: number;

  @ApiProperty({
    example: '1.0',
    description: 'Сопротивление теплопередачи от стены',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  rWall: number;

  @ApiProperty({
    example: '0.5',
    description: 'Сопротивление теплопередачи от окна',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  rWindow: number;

  @ApiProperty({ example: '1.05', description: 'Добавочный коэфициент' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  beta: number;

  @ApiProperty({
    example: '10',
    description: 'Коэфициент бытовых теплопередач',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  kHousehold: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  owner: User;

  @HasMany(() => Room)
  rooms: Room[];
}
