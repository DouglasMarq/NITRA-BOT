import {Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

@Entity({tableName: 'servers'})
export class Server {
  @PrimaryKey({type: 'uuid'})
  id: string = v4();

  @Property({length: 100, unique: true})
  serverId!: string;

  @Property({onCreate: () => new Date()})
  createdAt: Date = new Date();

  @Property({onUpdate: () => new Date()})
  updatedAt: Date = new Date();
}
