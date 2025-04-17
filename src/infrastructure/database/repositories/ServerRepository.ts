import {EntityRepository} from '@mikro-orm/postgresql';
import {Server} from '../entities/Server';

export class ServerRepository extends EntityRepository<Server> {
  async findByServerId(serverId: string): Promise<Server | null> {
    return this.findOne({serverId});
  }
}
