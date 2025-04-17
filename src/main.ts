import 'reflect-metadata';
import Core from '@/core/main';
import {Container} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import CommandsService from '@/core/CommandsService';
import DatabaseService from '@/infrastructure/database/DatabaseService';
import '@/helpers/dotenvx-config';
import EventsService from "@/core/events/EventsService";

const init = async () => {
  Container.set(LoggerHelper, new LoggerHelper());
  const dbService = new DatabaseService(Container.get(LoggerHelper));
  Container.set(DatabaseService, dbService);

  await dbService.init();

  if (await dbService.isConnected()) {
    new Core(
      Container.get(EventsService),
      Container.get(LoggerHelper),
      Container.get(CommandsService)
    );
  }
}

init();
