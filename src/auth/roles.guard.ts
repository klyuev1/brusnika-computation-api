import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

export interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const reqRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);

      if (!reqRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
      const token: string = req.cookies["jwt"];

      if (!token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован"
        });
      }

      const user = this.jwtService.verify(token);
      console.log(user)
      req.user = user;

      return user.roles.some(role => reqRoles.includes(role.value));
    } catch (e) {
      throw new HttpException("Нет прав для данного пользователя", HttpStatus.FORBIDDEN);
    }
  }
}
