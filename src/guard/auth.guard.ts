import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/middleware/auth.middleware';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    if (request.user) {
      return true;
    } else {
      throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
    }
  }
}
