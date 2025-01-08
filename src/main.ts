import 'reflect-metadata';
import Core from './core/main';
import {Container} from 'typedi';
import EventsService from './core/EventsService';
import dotenv from 'dotenv';
import {join} from 'path';

dotenv.config({path: join(__dirname, '..', '.env')});

new Core(Container.get(EventsService));
