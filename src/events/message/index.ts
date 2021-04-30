import { injectable } from "inversify";
import config from 'config';
import { Discord, Command, CommandMessage, CommandNotFound, Client } from "@typeit/discord";
import * as fs from 'fs';
const ytdl = require('ytdl-core');

@Discord(config.get('bot_config.prefix'))
@injectable()
export default class Message {
    private test: any;
    constructor() {
    }

    @Command('hello')
    private hello(message: CommandMessage) {
        if(message.channel.id !== '837515162248282153') return;
        message.channel.startTyping();
        message.reply(`Hello.`);
        message.channel.stopTyping();
    }

    @Command('purge :number')
    private bulkDeleteCommand(message: CommandMessage) {
        if(message.channel.id !== '837515162248282153') return;
        message.channel.messages.channel.bulkDelete(message.args.number);
    }

    @Command('play :url')
    private async playMusicCommand(message: CommandMessage) {
        if(message.channel.id !== '837515162248282153') return;
        this.test = await message.member?.voice.channel?.join();

        if(!fs.existsSync('/tmp/mp3')) {
            fs.mkdirSync('/tmp/mp3', { recursive: true });
        }

        let dispatcher = this.test?.play(ytdl(message.args.url));
        dispatcher?.on('end', (err: any) => {
            this.test?.channel.leave();
        });
    }

    @Command('volume :args')
    private volumeCommand(message: CommandMessage) {
        if(message.channel.id !== '837515162248282153') return;
        //@todo
    }

    @Command('disconnect')
    private disconnectVoiceCommand(message: CommandMessage) {
        if(message.channel.id !== '837515162248282153') return;
        message.member?.voice.channel?.leave();
    }

    @CommandNotFound()
    private notFound(message: CommandMessage) {
        if(message.channel.id !== '837515162248282153') return;
        message.reply("Comando não encontrado.");
        console.log(message);
    }
}
