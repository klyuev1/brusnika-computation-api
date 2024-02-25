import { Module } from '@nestjs/common';
import { FacadesController } from './facades.controller';
import { FacadesService } from './facades.service';

@Module({
  controllers: [FacadesController],
  providers: [FacadesService]
})
export class FacadesModule {}
