import {REST, Routes} from 'discord.js';
import {Service} from 'typedi';
import EventsService from './EventsService';

@Service()
export default class Core {
  constructor(public eventsService: EventsService) {
    this.init();
  }

  init() {
    void this.loadCommands();
  }

  private async loadCommands() {
    const commands = [
      {
        name: 'ping',
        description: 'Replies with Pong!',
      },
    ];

    const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN!);

    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
        {
          body: commands,
        },
      );

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }
}
