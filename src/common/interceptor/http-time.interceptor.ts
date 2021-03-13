import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'log4js';
import { Log4JService } from '..';

@Injectable()
export class HttpSpendTimeInterceptor implements NestInterceptor {
  private log: Logger;
  constructor(private readonly log4J: Log4JService) {
    this.log = log4J.getLogger('http');
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.log.info(`[waste time] -> ${Date.now() - now}ms`)));
  }
}
