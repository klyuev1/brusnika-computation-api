import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./roles.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: "Получение запрашиваемой роли" })
  @ApiResponse({ status: 200, type: [Role] })
  // @UseGuards(JwtAuthGuard)
  @Get("/:value")
  async getUserMe(@Param("value") value: string) {
    return this.rolesService.getRolesByValue(value);
  }
}
