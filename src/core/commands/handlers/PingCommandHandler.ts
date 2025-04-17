import {Service} from 'typedi';
import {ChatInputCommandInteraction} from 'discord.js';
import {CommandHandler} from '../CommandHandler';

@Service()
export default class PingCommandHandler implements CommandHandler {
  public async execute(
    interaction: ChatInputCommandInteraction,
  ): Promise<void> {
    const startTime = Date.now();

    await interaction.reply('Pinging...');

    const endTime = Date.now();
    const latency = endTime - startTime;

    await interaction.editReply({
      content: `Hey, i took: ${latency}ms to reply to ur message! Also, Pong 🏓`,
    });
  }
}
