import {EntityRepository} from '@mikro-orm/postgresql';
import {ServersLogs} from '@/infrastructure/database/entities/ServersLogs';

export class ServersLogsRepository extends EntityRepository<ServersLogs> {
  async findByServerId(serverId: string): Promise<ServersLogs | null> {
    return this.findOne({serverId});
  }

  async createServerLog(data: {
    serverId: string;
    message: string;
    userId: string;
    createdAt: Date;
  }): Promise<void> {
    const serverLog = this.create(data);

    await this.em.persistAndFlush(serverLog);
  }
}
