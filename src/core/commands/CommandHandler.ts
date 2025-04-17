import {ChatInputCommandInteraction} from 'discord.js';

export interface CommandHandler {
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
