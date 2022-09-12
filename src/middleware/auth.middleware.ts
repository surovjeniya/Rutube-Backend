import { Request } from 'express';
import { AuthService, JwtPayload } from 'src/auth/auth.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user: JwtPayload | null;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
    }
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const user = await this.authService.verifyAccessToken(token);
      if (!user) {
        req.user = null;
        next();
      } else {
        req.user = user;
        next();
      }
    }
  }
}
