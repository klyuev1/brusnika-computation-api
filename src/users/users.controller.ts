import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AuthenticatedRequest, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение авторизированного пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserMe(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.usersService.getByMyIdOrFail(userId);
  }

  @ApiOperation({ summary: 'Обновление данных о пользователе' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Body() userDto: UpdateUserDto,
  ) {
    const userId = req.user.id;
    return this.usersService.updateUser(userId, userDto);
  }
}
