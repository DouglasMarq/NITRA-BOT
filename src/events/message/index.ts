import config from 'config';
import { Discord, SimpleCommand, SimpleCommandMessage, SimpleCommandOption } from 'discordx';

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

    @SimpleCommand("hello")
    public helloCommand(command: SimpleCommandMessage) {
        // if (!this.whitelist[message.channel.id]) return;
        command.message.reply(`Hello.`);
    }

    @SimpleCommand("help")
    public helpCommand(command: SimpleCommandMessage) {
        command.message.reply(`!help`);
    }

    @SimpleCommand("purge")
    public bulkDeleteCommand(@SimpleCommandOption("number", {type: "NUMBER"}) number: number | undefined, command: SimpleCommandMessage) {
        if (!number) command.message.reply('Uso: !purge <<numero de mensagens aqui, limitado à 100>>');

        // if (number > 100) command.message.reply('Limitado a 100 mensagens.');
        // else command.message.channel.bulkDelete();
    }
}
