import {Service} from 'typedi';
import LoggerHelper from '@/helpers/Logger';
import {Client, GatewayIntentBits} from 'discord.js';

@Service()
export default class ClientService {
  private discordClient: null | Client = null;

  constructor(private logger: LoggerHelper) {
    this.logger.info('ClientService is starting..');
    void this.init();
  }

  private async init() {
    this.discordClient = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });

    await this.discordClient.login(process.env.DISCORD_BOT_TOKEN!);
  }

  public getClient(): Client {
    return this.discordClient!;
  }
}
