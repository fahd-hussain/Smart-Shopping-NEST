import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const sendResponse = {
      code: response.statusCode,
      success: true,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
    };

    return next.handle().pipe(
      map((data) => {
        Logger.log(`${request.method} ${request.url}`, 'ResponseInterceptor');

        return { ...sendResponse, data };
      }),
    );
  }
}
