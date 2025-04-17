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
    const serverLog = this.getEntityManager().create(ServersLogs, data);

    await this.getEntityManager().persistAndFlush(serverLog);

    // const em = this.getEntityManager();
    //
    // const serverLog = em.create(ServersLogs, data);
    //
    // await em.persistAndFlush(serverLog);
  }
}
