import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { LoggerService, ValidationPipe } from '@nestjs/common';
import { WinstonLogger, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
var winston = require('winston');
require('winston-daily-rotate-file');
const date = new Date()
async function bootstrap() {
  //defaults cors setting
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
     // let's log errors into its own file
        new winston.transports.DailyRotateFile({
          filename: `src/logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          maxFiles: '1d'
          
        }),
        // logging all level
        new winston.transports.DailyRotateFile({
          filename: `src/logs/%DATE%-info.log`,
          format: format.combine(format.timestamp(), format.json()),
          maxFiles: '1d'
        }),
        // we also want to see logs in our console
        new transports.Console({
         format: format.combine(
           format.cli(),
           format.splat(),
           format.timestamp(),
           format.printf((info) => {
             return `${info.timestamp} ${info.level}: ${info.message}`;
           }),
          ),
      }),
      ],
    }),
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     forbidNonWhitelisted: true,
  //     forbidUnknownValues: true,
  //   }),
  // );
  //swagger
  const config = new DocumentBuilder()
  .setTitle('Music example')
  .setDescription('The Music API description')
  .setVersion('1.0')
  .addBearerAuth()
  // .addTag('Music')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
