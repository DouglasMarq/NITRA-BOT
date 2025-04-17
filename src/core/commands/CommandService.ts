import {Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import {ChatInputCommandInteraction} from 'discord.js';
import {CommandHandlerMap} from './CommandHandlerMap';

@Service()
export default class CommandService {
  constructor(
    private logger: LoggerHelper,
    private commandHandlerMap: CommandHandlerMap,
  ) {
    this.logger.info('CommandService initialized');
  }

  public async executeCommand(
    interaction: ChatInputCommandInteraction,
  ): Promise<void> {
    const {commandName} = interaction;

    try {
      const handler = this.commandHandlerMap.getHandler(commandName);
      if (handler) {
        await handler.execute(interaction);
      } else {
        this.logger.warn(`No handler found for command: ${commandName}`);
        await interaction.reply({
          content: "Sorry, I don't know how to handle this command.",
        });
      }
    } catch (error) {
      this.logger.error(`Error executing command ${commandName}:`, error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'There was an error executing this command.',
        });
      }
    }
  }
}
