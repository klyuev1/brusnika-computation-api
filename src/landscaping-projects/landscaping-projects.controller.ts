import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LandscapingProjectsService } from './landscaping-projects.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LandscapingProject } from './landscaping-projects.model';
import { createProjectDto } from './dto/create-project.dto';

@ApiTags('Проекты озеленения')
@Controller('landscaping/projects')
export class LandscapingProjectsController {
    constructor(private landscapingProjectsService: LandscapingProjectsService) {}

    @ApiOperation({ summary: 'Получить все коллекции' })
    @ApiResponse({ status: 200, type: [LandscapingProject] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
      return this.landscapingProjectsService.getAllProjects();
    }

    @ApiOperation({ summary: 'Создание новой коллекции' })
    @ApiResponse({ status: 200, type: LandscapingProject })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() landscapingProjectDto: createProjectDto) {
      return this.landscapingProjectsService.createProject(landscapingProjectDto);
    }
}
