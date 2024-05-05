import { Module, forwardRef } from '@nestjs/common';
import { LandscapingProjectsService } from './landscaping-projects.service';
import { LandscapingProjectsController } from './landscaping-projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { LandscapingProject } from './landscaping-projects.model';
import { Collection } from 'src/collections/collections.model';

@Module({
  providers: [LandscapingProjectsService],
  controllers: [LandscapingProjectsController],
  imports: [
    SequelizeModule.forFeature([LandscapingProject, Collection]),
    forwardRef(() => AuthModule),
  ],
})
export class LandscapingProjectsModule {}
