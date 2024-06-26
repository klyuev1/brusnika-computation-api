import { Module, forwardRef } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './rooms.model';
import { Project } from '../projects/projects.model';
import { AuthModule } from '../auth/auth.module';
import { Facade } from '../facades/facades.model';
import { RoomFacade } from './room-facade.model';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    SequelizeModule.forFeature([Room, Project, Facade, RoomFacade]),
    forwardRef(() => AuthModule),
  ],
  exports: [RoomsService],
})
export class RoomsModule {}
