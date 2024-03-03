import { Module, forwardRef } from '@nestjs/common';
import { FacadesController } from './facades.controller';
import { FacadesService } from './facades.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { Facade } from './facades.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [FacadesController],
  providers: [FacadesService],
  imports: [
    SequelizeModule.forFeature([Facade]),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [FacadesService],
})
export class FacadesModule {}
