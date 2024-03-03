import { Module, forwardRef } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { User } from 'src/users/users.model';
import { Project } from './projects.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Room } from 'src/rooms/rooms.model';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    SequelizeModule.forFeature([User, Project, Room]),
    forwardRef(() => AuthModule),
  ],
})
export class ProjectsModule {}
