import {Client, Events, GatewayIntentBits} from 'discord.js';
import {Service} from 'typedi';
import LoggerHelper from '../helpers/logger';

@Service()
export default class EventsService {
  constructor(private logger: LoggerHelper) {
    this.init();
  }

  private init() {
    const client = new Client({intents: [GatewayIntentBits.Guilds]});

    client.on(Events.ClientReady, readyClient => {
      this.logger.info(`Logged in as ${readyClient.user.tag}!`);
      readyClient.user.setActivity({name: 'with development'});
    });

    client.on(Events.InteractionCreate, async interaction => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
      }
    });

    void client.login(process.env.DISCORD_BOT_TOKEN!);
  }
}
