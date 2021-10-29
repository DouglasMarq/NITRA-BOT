import config from 'config';
import { Discord, SimpleCommand, SimpleCommandMessage, SimpleCommandOption } from 'discordx';
import { Message as msg } from 'discord.js';

@Discord()
export default class Message {
    private readonly blacklist: any;
    private readonly whitelist: any;
    private readonly commands: Map<string, string>;
    constructor(commands: Map<string, string>) {
        this.commands = commands;
        this.blacklist = config.get('bot_config.blacklist');
        this.whitelist = config.get('bot_config.whitelist');
    }

    public helloCommand(message: msg) {
        // if (!this.whitelist[message.channel.id]) return;
        message.reply(`Hello.`);
    }

    public helpCommand(message: msg) {
        message.reply(`!help`);
    }

    public bulkDeleteCommand(number: number | undefined, message: msg) {
        if (!number) message.reply('Uso: !purge <<numero de mensagens aqui, limitado à 100>>');

        // if (number > 100) command.message.reply('Limitado a 100 mensagens.');
        // else command.message.channel.bulkDelete();
    }
}
