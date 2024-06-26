import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { ProjectsModule } from "./projects/projects.module";
import { RoomsModule } from "./rooms/rooms.module";
import { FacadesModule } from "./facades/facades.module";
import * as cookieParser from "cookie-parser";
import { Facade } from "./facades/facades.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { Project } from "./projects/projects.model";
import { Room } from "./rooms/rooms.model";
import { RoomFacade } from "./rooms/room-facade.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { CollectionsModule } from './collections/collections.module';
import { LandscapingProjectsModule } from './landscaping-projects/landscaping-projects.module';
import { Collection } from './collections/collections.model';
import { LandscapingProject } from './landscaping-projects/landscaping-projects.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Facade, Project, Room, RoomFacade, Role, UserRoles,Collection, LandscapingProject],
      autoLoadModels: true,
    }),
    UsersModule,
    ProjectsModule,
    RoomsModule,
    FacadesModule,
    FilesModule,
    CollectionsModule,
    LandscapingProjectsModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static")
    }),
    RolesModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*");
  }
}
