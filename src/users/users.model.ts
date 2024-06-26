import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Project } from "../projects/projects.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  name: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: "user@email.com", description: "Email пользователя" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: "Dwight Kurt Schrute",
    description: "Имя пользователя"
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: "12345", description: "Пароль пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Project)
  projects: Project[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
