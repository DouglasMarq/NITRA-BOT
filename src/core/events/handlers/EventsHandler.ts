import {Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import {
  Client,
  Interaction,
  Message,
  OmitPartialGroupDMChannel,
  PartialMessage,
} from 'discord.js';
import ClientService from '@/core/ClientService';
import MessageServices from '@/core/MessageServices';
import CommandService from '@/core/commands/CommandService';

@Service()
export default class EventsHandler {
  constructor(
    private logger: LoggerHelper,
    private discordClient: ClientService,
    private messageServices: MessageServices,
    private commandService: CommandService,
  ) {
    this.client = this.discordClient.getClient();
  }

  private client: Client | null = null;

  public handleClientReady = (readyClient: Client) => {
    this.logger.info(`Logged in as ${readyClient.user!.tag}!`);
    readyClient.user!.setActivity({name: 'with development'});
  };

  public handleInteractionCreate = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await this.commandService.executeCommand(interaction);
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
      .sendMessage(
        channel!,
        message.content!,
        channel!.guildId,
        message.author!.id,
        message.author!.displayName,
      )
      .catch(err => {
        this.logger.error(`Error sending message: ${err}`);
      });
  };
}
