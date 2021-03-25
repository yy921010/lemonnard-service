import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '@/common/exception/base.exception';
import { MysqlException } from '@/mysql2';

/**
 * 所有异常过滤器
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error(exception);
    switch (true) {
      case exception instanceof UnauthorizedException:
        response.status(HttpStatus.UNAUTHORIZED).json({
          error_code: 'TMK.' + exception.getStatus(),
          error_message: exception.message,
        });
        break;
      case exception instanceof MysqlException:
        response.status(HttpStatus.BAD_REQUEST).json({
          error_code: 'TMK.' + exception.getStatus(),
          error_message: exception.getResponse(),
        });
        break;
      case exception instanceof BaseException:
        response.status(HttpStatus.BAD_REQUEST).json({
          error_code: 'TMK.' + exception.getStatus(),
          error_message: exception.getResponse(),
        });
        break;
      case exception instanceof BadRequestException:
        response.status(HttpStatus.BAD_REQUEST).json({
          error_code: 400,
          error_message: '参数异常',
        });
        break;
      case exception instanceof NotFoundException:
        response.status(HttpStatus.NOT_FOUND).json({
          error_code: 404,
          error_message: '请求地址不存在',
        });
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error_code: 500,
          error_message: '服务端异常',
        });
    }
  }
}
