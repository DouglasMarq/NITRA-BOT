import {Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import ClientService from '@/core/ClientService';
import {Client, GuildBasedChannel} from 'discord.js';
import DatabaseService from '@/infrastructure/database/DatabaseService';
import {ServerLogsService} from '@/core/events/ServerLogsService';

@Service()
export default class MessageServices {
  constructor(
    private logger: LoggerHelper,
    private discordClient: ClientService,
    private databaseService: DatabaseService,
    private serverLogsService: ServerLogsService,
  ) {
    this.client = this.discordClient.getClient();
  }

  private client: Client | null = null;

  public sendMessage = async (
    channel: GuildBasedChannel,
    content: string,
    serverId: string,
    userId: string,
    user: string,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    channel!.send(
      `User **${user}** deleted a message with the following content: **${content}** in channel: **${channel.name}**`,
    );

    await this.serverLogsService.logServerMessage(serverId, content, userId);

    // const em = this.databaseService.getEntityManager();
    //
    // const serverLog = em.create('ServersLogs', {
    //   serverId,
    //   message: content,
    //   userId,
    //   createdAt: new Date(),
    // });
    //
    // await em.persistAndFlush(serverLog);
  };
}
