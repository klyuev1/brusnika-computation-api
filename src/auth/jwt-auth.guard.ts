import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    try {
      const token: string = req.cookies['jwt'];
      
      if (!token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }
      
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;

    } catch(e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }
  }

  

}