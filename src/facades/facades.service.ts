import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Facade } from "./facades.model";
import { createFacadeDto } from "./dto/create-facade.dto";
import { FilesService } from "../files/files.service";
import { Sequelize } from "sequelize-typescript";
import { Room } from "../rooms/rooms.model";

@Injectable()
export class FacadesService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Facade) private facadeRepository: typeof Facade,
    private fileService: FilesService,
    private sequelize: Sequelize
  ) {}

  async getAllFacades() {
    const facades = await this.facadeRepository.findAll({
      include: { all: true }
    });
    return facades;
  }

  async createFacade(dto: createFacadeDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const { name, height, width, areaWindow } = dto;

    // Проверка входных данных
    const areaWall: number = (height * width) / 1000000 - areaWindow;

    console.log(areaWall);
    if (areaWall < 0) {
      throw new HttpException("Площадь стены не может быть меньше 0", HttpStatus.CONFLICT);
    }
    const facade = await this.facadeRepository.create({
      name,
      link: fileName,
      height,
      width,
      areaWall,
      areaWindow
    });
    return facade;
  }

  async deleteFacade(value: number) {
    const transaction = await this.sequelize.transaction();
    const facade = await this.facadeRepository.findOne({
      where: { id: value },
      include: { all: true }
    });

    if (!facade) {
      throw new HttpException("Фасад с таким ID не найден", HttpStatus.NOT_FOUND);
    }

    const rooms = await this.roomRepository.findAll({
      include: [
        {
          model: this.facadeRepository,
          where: { id: value }
        }
      ],
      transaction
    });

    await facade.$set("rooms", [], { transaction });
    for (const room of rooms) {
      await room.destroy({ transaction });
    }
    await facade.destroy({ transaction });
    await transaction.commit();

    return facade;
  }
}
