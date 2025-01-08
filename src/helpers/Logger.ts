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

  error(message: string) {
    this.winston?.error(message);
  }

  info(message: string) {
    this.winston?.info(message);
  }

  debug(message: string) {
    this.winston?.debug(message);
  }
}
