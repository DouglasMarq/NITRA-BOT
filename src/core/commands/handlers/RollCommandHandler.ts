import {Service} from 'typedi';
import {ChatInputCommandInteraction} from 'discord.js';
import {CommandHandler} from '../CommandHandler';

@Service()
export default class RollCommandHandler implements CommandHandler {
  public async execute(
    interaction: ChatInputCommandInteraction,
  ): Promise<void> {
    await interaction.reply(
      Math.floor(Math.random() * (6 - 1 + 1) + 1).toString(),
    );
  }
}
