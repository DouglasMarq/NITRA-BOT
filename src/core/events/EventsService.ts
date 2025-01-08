import {Client, Events} from 'discord.js';
import {Service} from 'typedi';
import LoggerHelper from '../../helpers/logger';
import EventsHandler from './EventsHandler';
import ClientService from '../ClientService';

@Service()
export default class EventsService {
  client: Client | null = null;

  constructor(
    private logger: LoggerHelper,
    private eventsHandler: EventsHandler,
    private discordClient: ClientService,
  ) {
    this.logger.info('EventsService is starting..');
    this.init();
  }

  private init() {
    this.client = this.discordClient.getClient();

    this.client.on(Events.ClientReady, this.eventsHandler.handleClientReady);
    this.client.on(
      Events.InteractionCreate,
      this.eventsHandler.handleInteractionCreate,
    );
  }
}
