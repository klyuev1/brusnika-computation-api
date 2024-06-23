import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { AuthModule } from "../auth/auth.module";
import { Project } from "../projects/projects.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Project, Role, UserRoles]), forwardRef(() => AuthModule), RolesModule],
  exports: [UsersService]
})
export class UsersModule {}
