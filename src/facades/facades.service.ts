import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Facade } from './facades.model';
import { createFacadeDto } from './dto/create-facade.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class FacadesService {
  constructor(
    @InjectModel(Facade) private facadeRepository: typeof Facade,
    private fileService: FilesService,
  ) {}

  async getAllFacades() {
    const facades = await this.facadeRepository.findAll({
      include: { all: true },
    });
    return facades;
  }

  async createFacade(dto: createFacadeDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const { name, height, width, areaWindow } = dto;

    // Проверка входных данных
    const areaWall: number = (height * width) / 1000000 - areaWindow;
    if (areaWall < 0) {
      throw new HttpException(
        'Площадь стены не может быть меньше 0',
        HttpStatus.CONFLICT,
      );
    }
    const facade = await this.facadeRepository.create({
      name,
      link: fileName,
      height,
      width,
      areaWall,
      areaWindow,
    });
    return facade;
  }

  async deleteFacade(value: number) {
    const facade = await this.facadeRepository.findOne({
      where: { id: value },
    });

    if (!facade) {
      throw new HttpException(
        'Фасад с таким ID не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.facadeRepository.destroy({ where: { id: value } });
    return facade;
  }
}
