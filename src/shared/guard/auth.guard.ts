import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request) {
      if (request.originalUrl.includes('/auth')) {
        return true;
      }
      if (!request.headers.authorization) {
        return false;
      }
      request.user = await this.validateToken(request.headers.authorization);
      return true;
    }
  }

  async validateToken(auth: string) {
    const tokenSplit = auth.split(' ');
    if (tokenSplit[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const token = tokenSplit[1];

    try {
      const decoded: any = jwt.verify(token, env.JWT_SECRET);

      if (!decoded) {
        throw new Error('Invalid token');
      }

      if (!decoded.verified) {
        throw new Error('User not verified');
      }

      if (decoded.exp <= Date.now() / 1000) {
        throw new Error('Token expired');
      }

      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
