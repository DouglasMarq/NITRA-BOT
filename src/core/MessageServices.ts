import {Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import ClientService from '@/core/ClientService';
import {Client, GuildBasedChannel} from 'discord.js';

@Service()
export default class MessageServices {
  constructor(
    private logger: LoggerHelper,
    private discordClient: ClientService,
  ) {
    this.client = this.discordClient.getClient();
  }

  private client: Client | null = null;

  public sendMessage = async (
    channel: GuildBasedChannel,
    content: string,
    user: string,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    channel!.send(
      `User **${user}** deleted a message with the following content: **${content}** in channel: **${channel.name}**`,
    );
  };
}
