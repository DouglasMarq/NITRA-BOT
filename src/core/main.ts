import {REST, Routes} from 'discord.js';
import {Service} from 'typedi';
import EventsService from '@/core/events/EventsService';
import LoggerHelper from '@/helpers/Logger';
import CommandsService from '@/core/CommandsService';

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
      this.logger.info(
        `Total of ${commands.length} loaded. Current commands are: ${commands.map(command => command.name).join(', ')}`,
      );

      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID!),
        {
          body: commands,
        },
      );

      await rest.put(
        Routes.applicationGuildCommands(
          process.env.DISCORD_BOT_CLIENT_ID!,
          '199537517576454145',
        ),
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
