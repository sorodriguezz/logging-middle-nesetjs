import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from './logger.entity';
import { LoggingMiddleware } from './logging/logging.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.100.49',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'postgres',
      entities: [RequestLog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([RequestLog]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
