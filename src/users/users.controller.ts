import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { AuthenticatedRequest, JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { addRoleDto } from "./dto/add-role.dto";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Получение авторизированного пользователя" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getUserMe(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.usersService.getByMyIdOrFail(userId);
  }

  @ApiOperation({ summary: "Обновление данных о пользователе" })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Patch("me")
  async updateUser(@Req() req: AuthenticatedRequest, @Body() userDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.updateUser(userId, userDto);
  }

  // ADMIN
  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @Get("")
  async getUsers() {
    console.log("Entering getUsers method");
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Выдача ролей пользователю" })
  @ApiResponse({ status: 200 })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @Post("/role")
  async addRole(@Body() dto: addRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiResponse({ status: 200 })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @Delete("/role/:userId")
  async deleteUser(@Param("userId") userId: string) {
    return this.usersService.deleteUser(+userId);
  }
}
