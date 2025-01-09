import {Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import {
  Channel,
  Client,
  Interaction,
  Message,
  OmitPartialGroupDMChannel,
  PartialMessage,
} from 'discord.js';
import {CommandsEnums} from '@/helpers/CommandsEnums';
import ClientService from '@/core/ClientService';
import MessageServices from '@/core/MessageServices';

@Service()
export default class EventsHandler {
  constructor(
    private logger: LoggerHelper,
    private discordClient: ClientService,
    private messageServices: MessageServices,
  ) {
    this.client = this.discordClient.getClient();
  }

  private client: Client | null = null;

  public handleClientReady = (readyClient: Client) => {
    this.logger.info(`Logged in as ${readyClient.user!.tag}!`);
    readyClient.user!.setActivity({name: 'with development'});
  };

  public handleInteractionCreate = async (interaction: Interaction) => {
    //todo - refactor this entire function and split into smaller one with proper context and services
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === CommandsEnums.PING) {
      const sent = await interaction.reply('Pinging...');

      await interaction.editReply({
        content: `Hey, i took: ${sent.createdTimestamp - interaction.createdTimestamp}ms to reply to ur message! Also, Pong 🏓`,
      });
    }

    if (interaction.commandName === CommandsEnums.ROLL) {
      await interaction.reply(
        Math.floor(Math.random() * (6 - 1 + 1) + 1).toString(),
      );
    }
  };

  public handleMessageDelete = async (
    message: OmitPartialGroupDMChannel<Message<boolean> | PartialMessage>,
  ) => {
    if (message.author?.bot) return;
    if (message.guildId !== '199537517576454145') {
      this.logger.info(
        `Message wasn't deleted in the correct guild: ${message.content}`,
      );
      return;
    }

    const channel = this.client!.guilds.cache.find(
      guild => guild.id === message.guildId,
    )?.channels.cache.get(message.channelId);

    this.messageServices
      .sendMessage(channel!, message.content!, message.author!.displayName)
      .catch(err => {
        this.logger.error(`Error sending message: ${err}`);
      });
  };
}
