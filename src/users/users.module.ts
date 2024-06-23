import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { AuthModule } from "src/auth/auth.module";
import { Project } from "src/projects/projects.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { RolesModule } from "src/roles/roles.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Project, Role, UserRoles]), forwardRef(() => AuthModule), RolesModule],
  exports: [UsersService]
})
export class UsersModule {}
