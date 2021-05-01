import 'reflect-metadata';
import { Container } from 'inversify';
import Server from '../server';
import Mongo from './database';
import { Logger } from 'winston';
import Core from '../core';
import Events from '../events';
import Message from '../events/message';
import Log from '../util/log';
import http from '../util/http';

let container = new Container();

export default function bindContainers() {
  // let logger = newLogger(config.get("logger.file"));
console.log('binding');
  container.bind<Server>(Server).to(Server).inSingletonScope();
  container.bind<Log>(Log).to(Log).inSingletonScope();
  container.bind<Core>(Core).to(Core).inSingletonScope();
  container.bind<Events>(Events).to(Events).inSingletonScope();
  container.bind<Message>(Message).to(Message).inSingletonScope();
  container.bind<http>(http).to(http).inSingletonScope();

  return container;
}
