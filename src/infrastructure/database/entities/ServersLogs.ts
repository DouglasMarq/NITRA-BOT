import {Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

@Entity({tableName: 'servers_logs'})
export class ServersLogs {
  @PrimaryKey({type: 'uuid'})
  id: string = v4();

  @Property({length: 100})
  serverId!: string;

  @Property()
  message!: string;

  @Property({length: 100})
  userId: string | null = null;

  @Property({onCreate: () => new Date()})
  createdAt: Date = new Date();
}
