import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from '../projects/projects.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => RoomsModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
