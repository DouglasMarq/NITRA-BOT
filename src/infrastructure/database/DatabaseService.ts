import {Container, Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import {MikroORM, Options, PostgreSqlDriver} from '@mikro-orm/postgresql';
import {ServersLogsRepository} from '@/infrastructure/database/repositories/ServersLogsRepository';
import {ServersLogs} from '@/infrastructure/database/entities/ServersLogs';
import {ServerRepository} from "@/infrastructure/database/repositories/ServerRepository";
import {Server} from "@/infrastructure/database/entities/Server";

export default class DatabaseService {
  private orm: MikroORM | null = null;

  constructor(private logger: LoggerHelper) {
    void this.init();
  }

  async init() {
    this.logger.info('DatabaseService is starting..');
    await this.connect();
    Container.set(ServersLogsRepository, new ServersLogsRepository(this.getEntityManager(), ServersLogs));
    Container.set(ServerRepository, new ServerRepository(this.getEntityManager(), Server));
  }

  async isConnected(): Promise<boolean | undefined> {
    return this.orm?.isConnected();
  }

  async connect(): Promise<void> {
    try {
      const config: Options = {
        driver: PostgreSqlDriver,

        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        dbName: process.env.DB_NAME || 'discord_bot',

        entities: ['./dist/infrastructure/database/entities'],
        entitiesTs: ['./src/infrastructure/database/entities'],

        driverOptions: {
          connection: {ssl: process.env.DB_SSL === 'true'},
        },

        migrations: {
          path: './dist/infrastructure/database/migrations',
          pathTs: './src/infrastructure/database/migrations',
        },

        debug: process.env.NODE_ENV !== 'production',
      };

      this.orm = await MikroORM.init(config);

      if (process.env.NODE_ENV === 'development') {
        const generator = this.orm.getSchemaGenerator();
        await generator.updateSchema();
      }

      this.logger.info(
        'PostgreSQL database connection established using MikroORM',
      );
    } catch (error) {
      this.logger.error('Failed to connect to PostgreSQL database', error);
      throw error;
    }
  }

  getORM(): MikroORM {
    if (!this.orm) {
      throw new Error(
        'Database connection not established. Call connect() first',
      );
    }
    return this.orm;
  }

  getEntityManager() {
    return this.getORM().em.fork();
  }

  async disconnect(): Promise<void> {
    try {
      if (this.orm) {
        await this.orm.close();
        this.orm = null;
        this.logger.info('PostgreSQL database connection closed');
      }
    } catch (error) {
      this.logger.error('Error disconnecting from PostgreSQL database', error);
    }
  }
}
