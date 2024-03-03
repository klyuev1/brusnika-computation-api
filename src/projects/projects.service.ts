import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
  ) {}

  async getProjects(userId: string) {
    const projects = await this.projectRepository.findAll({
      where: { userId },
      include: { all: true },
    });
    return projects;
  }

  async createProject(userId: string, projectDto: CreateProjectDto) {
    try {
      const project = await this.projectRepository.create({
        ...projectDto,
        userId,
      });
      return project;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        throw new BadRequestException('Переданы некорректные данные');
      }
      throw error;
    }
  }

  async updateProject(projectId: number, projectDto: CreateProjectDto) {
    try {
      const proj = await this.projectRepository.findOne({
        where: { id: projectId },
      });
      if (!proj) throw new NotFoundException('Проект не найден');
      await this.projectRepository.update(projectDto, {
        where: { id: projectId },
      });
      return projectDto;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      } else if (e.name === 'SequelizeValidationError') {
        throw new BadRequestException('Переданы некорректные данные');
      } else {
        throw e;
      }
    }
  }

  async deleteProject(projectId: number) {
    const proj = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!proj) throw new NotFoundException('Проект не найден');
    await this.projectRepository.destroy({ where: { id: projectId } });
    return { message: 'Проект удален' };
  }
}
