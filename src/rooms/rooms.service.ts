import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './rooms.model';
import { Project } from 'src/projects/projects.model';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { Response } from 'express';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
import { Facade } from 'src/facades/facades.model';

interface ITableItem {
  tOutside: number;
  tInside: number;
  rWall: number;
  rWindow: number;
  beta: number;
  kHousehold: number;
  number: string;
  name: string;
  height: number;
  width: number;
  areaWall: number;
  areaRoom: number;
  heatLoss: number;
}

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Project) private projectRepository: typeof Project,
    @InjectModel(Facade) private facadeRepository: typeof Facade,
  ) {}

  async getRooms(projectId: number) {
    const rooms = await this.roomRepository.findAll({
      where: { projectId },
      include: { all: true },
    });
    return rooms;
  }

  async createRoom(
    projectId: number,
    facadeIds: number[],
    roomDto: CreateRoomDto,
  ) {
    try {
      const project = await this.projectRepository.findByPk(projectId);
      if (!project) {
        throw new NotFoundException('Проект не найден');
      }

      const facades = await this.facadeRepository.findAll({
        where: { id: facadeIds },
      });
      console.log(facades);
      if (facades.length !== facadeIds.length) {
        throw new NotFoundException('Один или несколько фасадов не найдены');
      }

      const totalHeatLoss = facades.reduce((sum, facade) => {
        return sum + this.calculateHeatLoss(project, facade, roomDto);
      }, 0);

      const createdRoom = await this.roomRepository.create({
        ...roomDto,
        heatLoss: totalHeatLoss,
        projectId,
        // facadeId,
      });
      return createdRoom;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        throw new BadRequestException('Переданы некорректные данные');
      }
      throw error;
    }
  }

  async deleteRoom(projectId: number, roomId: number) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId, projectId: projectId },
    });
    if (!room) throw new NotFoundException('Карточка с таким ID не найдена');
    try {
      await room.destroy();
      return { message: 'Комната удалена' };
    } catch (e) {
      throw new BadRequestException('Не удалось удалить карточку');
    }
  }

  private calculateHeatLoss(
    project: Project,
    facade: Facade,
    roomDto: CreateRoomDto,
  ): number {
    const { tOutside, tInside, rWall, rWindow, beta, kHousehold } = project;
    const { height, areaWall, areaWindow } = facade;

    const { areaRoom } = roomDto;
    const kTransferable = 0.3354;
    const kExpenditure = 0.35;

    const heatLossDesignOfWall =
      (1 / rWall) * areaWall * (tInside - tOutside) * beta;
    console.log(heatLossDesignOfWall);
    const heatLossDesignOfWindow =
      (1 / rWindow) * areaWindow * (tInside - tOutside) * beta;
    const heatLossHousehold = areaRoom * kHousehold;
    const heatLossInfiltration =
      (height / 1000) *
      kExpenditure *
      kTransferable *
      (tInside - tOutside) *
      areaRoom;
    const heatLoss = Math.ceil(
      heatLossDesignOfWall +
        heatLossDesignOfWindow +
        heatLossInfiltration -
        heatLossHousehold,
    );

    console.log(heatLoss);

    return heatLoss;
  }

  //   async downloadCSV(userId: string, projectId: number, @Res() res: Response) {
  //     const projects = await this.projectRepository.findAll({
  //       where: { userId },
  //       include: { all: true },
  //     });
  //     const proj = await this.projectRepository.findOne({
  //       where: { id: projectId },
  //     });
  //     const rooms = await this.roomRepository.findAll({
  //       where: { projectId },
  //       include: { all: true },
  //     });

  //     if (projects.some((item) => item.id === proj.id)) {
  //       const { tOutside, tInside, rWall, rWindow, beta, kHousehold } = proj;

  //       const table: ITableItem[] = [];
  //       rooms.map(
  //         ({ number, name, height, width, areaWall, areaRoom, heatLoss }) => {
  //           table.push({
  //             tOutside,
  //             tInside,
  //             rWall,
  //             rWindow,
  //             beta,
  //             kHousehold,
  //             number,
  //             name,
  //             height,
  //             width,
  //             areaWall,
  //             areaRoom,
  //             heatLoss,
  //           });
  //         },
  //       );

  //       await this.downloadRooms(table);
  //       const filePath = path.resolve(__dirname, '../../dist/static/output.csv');

  //       res.sendFile(filePath, {
  //         headers: {
  //           'Content-Disposition': `attachment; filename="output.csv"`,
  //           'Content-Type': 'text/csv; charset=utf-8',
  //         },
  //       });
  //     } else {
  //       throw new NotFoundException('Проект не найден');
  //     }
  //   }

  //   private async downloadRooms(data: ITableItem[]) {
  //     const csvWriter = await createObjectCsvWriter({
  //       path: path.resolve(__dirname, '../../dist/static/output.csv'),
  //       header: [
  //         { id: 'tOutside', title: 'Температура снаружи' },
  //         { id: 'tInside', title: 'Температура внутрь' },
  //         { id: 'rWall', title: 'Коэффициент теплопередачи стены' },
  //         { id: 'rWindow', title: 'Коэффициент теплопередачи окна' },
  //         { id: 'beta', title: 'Коэффициент на сторону света' },
  //         { id: 'kHousehold', title: 'Бытовой коэффициент' },
  //         { id: 'number', title: 'Номер' },
  //         { id: 'name', title: 'Наименование' },
  //         { id: 'height', title: 'Высота' },
  //         { id: 'width', title: 'Ширина' },
  //         { id: 'areaWall', title: 'Площадь оконного проема' },
  //         { id: 'areaRoom', title: 'Площадь стены' },
  //         { id: 'heatLoss', title: 'Теплопотери' },
  //       ],
  //       encoding: 'utf8',
  //     });

  //     return csvWriter.writeRecords(data);
  //   }
}
