import { Module, forwardRef } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Collection } from './collections.model';

@Module({
  controllers: [CollectionsController],
  providers: [CollectionsService],
  imports: [
    SequelizeModule.forFeature([Collection]),
    forwardRef(() => AuthModule),
  ],
  exports: [CollectionsService],
})
export class CollectionsModule {}
