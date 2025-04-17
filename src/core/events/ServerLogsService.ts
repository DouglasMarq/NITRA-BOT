import {Service} from 'typedi';
import {ServersLogsRepository} from '@/infrastructure/database/repositories/ServersLogsRepository';

@Service()
export class ServerLogsService {
  constructor(private repository: ServersLogsRepository) {}

  async logServerMessage(
    serverId: string,
    message: string,
    userId: string,
  ): Promise<void> {
    await this.repository.createServerLog({
      serverId,
      message,
      userId,
      createdAt: new Date(),
    });
  }
}
