import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly reflector: Reflector) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = STATUS_CODES[status];
    const message = exception.getResponse();

    console.log(message, '--------------------------')
    response.status(status).json({
      statusCode: status,
      error,
      path: request.url,
      message,
    });
  }

  
}
