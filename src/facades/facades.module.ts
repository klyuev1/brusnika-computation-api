import { Module, forwardRef } from '@nestjs/common';
import { FacadesController } from './facades.controller';
import { FacadesService } from './facades.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Facade } from './facades.model';
import { FilesModule } from '../files/files.module';
import { Room } from '../rooms/rooms.model';
import { RoomFacade } from '../rooms/room-facade.model';

@Module({
  controllers: [FacadesController],
  providers: [FacadesService],
  imports: [
    SequelizeModule.forFeature([Facade, Room, RoomFacade]),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [FacadesService],
})
export class FacadesModule {}
