import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './rooms.model';
import { Project } from 'src/projects/projects.model';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';

@Injectable()
export class RoomsService {

  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Project) private projectRepository: typeof Project,
    ) {}

  async getRooms(projectId: number) {
    const rooms = await this.roomRepository.findAll({where: {projectId}, include: {all: true}});
    return rooms;
  }

  async createRoom(projectId: number, roomDto: CreateRoomDto) {
    try {
      const project = await this.projectRepository.findByPk(projectId);
      if (!project) {
        throw new NotFoundException('Проект не найден');
      }

      const heatLoss = this.calculateHeatLoss(project, roomDto);

      const createdRoom = await this.roomRepository.create({ ...roomDto, heatLoss, projectId });
      return createdRoom;

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        throw new BadRequestException('Переданы некорректные данные');
      }
      throw error;
    }
  }

  async deleteRoom(projectId: number, roomId: number) {
    const room = await this.roomRepository.findOne({ where: { id: roomId, projectId: projectId } });
    if (!room) throw new NotFoundException('Карточка с таким ID не найдена')
    try { 
      await room.destroy();
      return { message: 'Комната удалена' }; 
    }
    catch(e) { 
      throw new BadRequestException('Не удалось удалить карточку');
    }
  }

  private calculateHeatLoss(project: Project, roomDto: CreateRoomDto): number {
    const { tOutside, tInside, rWall, rWindow, beta, kHousehold } = project;
    const {number, name, height, width, areaWall, areaWindow, areaRoom} = roomDto;
    const kTransferable = 0.3354;
    const kExpenditure = 0.35;

    const heatLossDesignOfWall = (1 / rWall) * areaWall * (tInside - tOutside) * beta;
    const heatLossDesignOfWindow = (1 / rWindow) * areaWindow * (tInside - tOutside) * beta;
    const heatLossHousehold = areaRoom * kHousehold;
    const heatLossInfiltration = height * kExpenditure * kTransferable * (tInside - tOutside) * areaRoom;
    const heatLoss = Math.ceil(heatLossDesignOfWall + heatLossDesignOfWindow + heatLossInfiltration - heatLossHousehold); 

    return heatLoss;
  }

}
