import {createLogger, Logger, transports, format} from 'winston';
import {Service} from 'typedi';

@Service()
export default class LoggerHelper {
  private winston: Logger | undefined = undefined;

  constructor() {
    this.winston = createLogger({
      level: 'info',
      format: format.combine(format.json(), format.colorize()),
      defaultMeta: {service: 'nitra-bot'},
      transports: [new transports.Console({format: format.simple()})],
    });

    if (process.env.NODE_ENV === 'production') {
      this.winston.add(
        new transports.File({
          filename: 'error.log',
          level: 'error',
        }),
      );
      this.winston.add(
        new transports.File({
          filename: 'combined.log',
        }),
      );
    }
  }

  error(message: string, ...meta: any[]) {
    this.winston?.error(message, ...meta);
  }

  info(message: string, ...meta: any[]) {
    this.winston?.info(message, ...meta);
  }

  debug(message: string, ...meta: any[]) {
    this.winston?.debug(message, ...meta);
  }

  warn(message: string, ...meta: any[]) {
    this.winston?.warn(message, ...meta);
  }
}
