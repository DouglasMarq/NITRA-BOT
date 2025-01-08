import {REST, Routes} from 'discord.js';
import {Service} from 'typedi';
import EventsService from './EventsService';
import LoggerHelper from '../helpers/logger';
import CommandsService from './CommandsService';

@Service()
export default class Core {
  constructor(
    private eventsService: EventsService,
    private logger: LoggerHelper,
    private commands: CommandsService,
  ) {
    this.init();
  }

  init() {
    void this.loadCommands();
  }

  private async loadCommands() {
    const commands = this.commands.getCommands();

    const rest = new REST({version: '10'}).setToken(
      process.env.DISCORD_BOT_TOKEN!,
    );

    try {
      this.logger.info('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID!),
        {
          body: commands,
        },
      );

      this.logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }
}
