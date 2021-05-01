import config from 'config';
import { Command, CommandMessage, CommandNotFound } from "@typeit/discord";

export default class Message {
    private readonly blacklist: any;
    private readonly whitelist: any;
    private readonly commands: Map<string, string>;
    constructor(commands: Map<string, string>) {
        this.commands = commands;
        this.blacklist = config.get('bot_config.blacklist');
        this.whitelist = config.get('bot_config.whitelist');
    }

    public helloCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        message.reply(`Hello.`);
    }

    public helpCommand(message: CommandMessage) {
        if(!this.commands.has(message.commandContent)) return;
        let getCommand = this.commands.get(message.commandContent);
        if(getCommand) message.reply(getCommand);
    }

    public bulkDeleteCommand(message: CommandMessage) {
        let number = message.args.number;
        if(number > 100) message.reply('Limitado a 100 mensagens.');
        else message.channel.messages.channel.bulkDelete(number);
    }
}
