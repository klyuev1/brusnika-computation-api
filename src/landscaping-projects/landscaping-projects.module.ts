import { Module, forwardRef } from '@nestjs/common';
import { LandscapingProjectsService } from './landscaping-projects.service';
import { LandscapingProjectsController } from './landscaping-projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [LandscapingProjectsService],
  controllers: [LandscapingProjectsController],
  imports: [
    SequelizeModule.forFeature([Collection]),
    forwardRef(() => AuthModule),
  ],
})
export class LandscapingProjectsModule {}
