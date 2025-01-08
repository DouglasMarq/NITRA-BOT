import 'reflect-metadata';
import Core from './core/main';
import {Container} from 'typedi';
import EventsService from './core/events/EventsService';
import LoggerHelper from './helpers/logger';
import CommandsService from './core/CommandsService';
import './helpers/dotenvx-config';

new Core(
  Container.get(EventsService),
  Container.get(LoggerHelper),
  Container.get(CommandsService),
);
