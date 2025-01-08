import {Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import {Client} from 'discord.js';
import {CommandsEnums} from '@/helpers/CommandsEnums';

@Service()
export default class EventsHandler {
  constructor(private logger: LoggerHelper) {}

  public handleClientReady = (readyClient: Client) => {
    this.logger.info(`Logged in as ${readyClient.user!.tag}!`);
    readyClient.user!.setActivity({name: 'with development'});
  };

  public handleInteractionCreate = async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === CommandsEnums.PING) {
      await interaction.reply('Pong!');
    }

    if (interaction.commandName === CommandsEnums.ROLL) {
      await interaction.reply(
        Math.floor(Math.random() * (6 - 1 + 1) + 1).toString(),
      );
    }
  };
}
