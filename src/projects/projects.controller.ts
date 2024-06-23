import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticatedRequest, JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Project } from "./projects.model";
import { CreateProjectDto } from "./dto/create-project.dto";

@ApiTags("Проекты")
@Controller("teplo/projects")
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @ApiOperation({ summary: "Получение проектов" })
  @ApiResponse({ status: 200, type: [Project] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getprojects(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.projectService.getProjects(userId);
  }

  @ApiOperation({ summary: "Создание проекта" })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(@Req() req: AuthenticatedRequest, @Body() projectDto: CreateProjectDto) {
    const userId = req.user.id;
    return this.projectService.createProject(userId, projectDto);
  }

  @ApiOperation({ summary: "Обновление данных о проекте" })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Patch(":projectId")
  async updateProject(@Param("projectId") projectId: string, @Body() projectDto: CreateProjectDto) {
    return this.projectService.updateProject(+projectId, projectDto);
  }

  @ApiOperation({ summary: "Удаление проекта" })
  @ApiResponse({ status: 200, type: "message" })
  @UseGuards(JwtAuthGuard)
  @Delete(":projectId")
  async deleteProject(@Param("projectId") projectId: string) {
    return this.projectService.deleteProject(+projectId);
  }
}
