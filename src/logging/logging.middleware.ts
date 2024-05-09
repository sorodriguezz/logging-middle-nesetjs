import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestLog } from 'src/logger.entity';
import { decodeJwt } from 'src/helpers/decode-jwt.helper';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(RequestLog)
    private logRepository: Repository<RequestLog>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const originalSend = res.send;
    const requestBody = req.body;

    res.send = (body: any) => {
      const duration = Date.now() - startTime;
      const decoded = decodeJwt(req.headers.authorization?.split(' ')[1]);

      const logEntry = this.logRepository.create({
        timestamp: new Date(),
        method: req.method,
        endpoint: req.originalUrl,
        responseStatus: res.statusCode,
        user: decoded ? decoded.username : null,
        ipAddress: req.headers.authorization?.split(' ')[1],
        userAgent: req.get('user-agent'),
        durationMs: duration,
        requestBody: JSON.stringify(requestBody),
        isError: res.statusCode >= 400,
        errorMessage: res.statusCode >= 400 ? 'Request failed' : null,
        responseBody: body,
      });

      // guarda el log en la base de datos de manera sincronica
      this.logRepository.save(logEntry);

      // restaura el original send y envía la respuesta al cliente
      res.send = originalSend;
      return res.send(body);
    };

    next();
  }
}
