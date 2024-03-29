import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.model';
import { AuthenticatedRequest, JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { Response } from 'express';

@ApiTags('Комнаты')
@Controller('projects')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Получение комнат' })
  @ApiResponse({ status: 200, type: [Room] })
  @UseGuards(JwtAuthGuard)
  @Get(':projectId/rooms')
  async getRooms(@Param('projectId') projectId: string) {
    return this.roomsService.getRooms(+projectId);
  }

  @ApiOperation({ summary: 'Создание комнаты' })
  @ApiResponse({ status: 201, type: Room })
  @UseGuards(JwtAuthGuard)
  @Post(':projectId/rooms')
  async createRoom(
    @Param('projectId') projectId: string,
    @Body() roomDto: CreateRoomDto,
  ) {
    return this.roomsService.createRoom(+projectId, roomDto);
  }

  @ApiOperation({ summary: 'Удаление комнаты' })
  @ApiResponse({ status: 200, type: 'message' })
  @UseGuards(JwtAuthGuard)
  @Delete(':projectId/rooms/:roomId')
  async deleteProject(
    @Param('projectId') projectId: string,
    @Param('roomId') roomId: string,
  ) {
    return this.roomsService.deleteRoom(+projectId, +roomId);
  }

  @ApiOperation({ summary: 'Получение комнат' })
  @ApiResponse({ status: 200, type: [Room] })
  @UseGuards(JwtAuthGuard)
  @Get(':projectId/rooms/download')
  async download(
    @Req() req: AuthenticatedRequest,
    @Param('projectId') projectId: string,
    @Res() res: Response,
  ) {
    const userId = req.user.id;
    return this.roomsService.downloadCSV(userId, +projectId, res);
  }
}
