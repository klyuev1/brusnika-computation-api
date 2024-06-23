import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "admin", description: "Роль" })
  role: string;

  @ApiProperty({
    example: "Администратор",
    description: "Описание роли"
  })
  value: string;
}
