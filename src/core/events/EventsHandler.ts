import {Service} from 'typedi';
import LoggerHelper from '../../helpers/logger';
import {Client} from 'discord.js';

@Service()
export default class EventsHandler {
  constructor(private logger: LoggerHelper) {}

  public handleClientReady = (readyClient: Client) => {
    this.logger.info(`Logged in as ${readyClient.user!.tag}!`);
    readyClient.user!.setActivity({name: 'with development'});
  };

  public handleInteractionCreate = async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  };
}
