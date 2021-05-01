import { injectable } from "inversify";
import config from 'config';
import { Command, CommandMessage, Discord, CommandNotFound } from "@typeit/discord";
import Message from "./message";
import Log from "../util/log";
import Voice from './voice';

const BOT_PREFIX: string = config.get('bot_config.prefix')

@Discord(BOT_PREFIX)
@injectable()
export default class Events {
    private message: Message;
    private voice: Voice;
    private commands: Map<string, string>;
    constructor() {
        this.voice = new Voice();
        this.commands = new Map();
        this.loadCommands();
        this.message = new Message(this.commands);
    }

    //-------------------------- VOICE --------------------------
    @Command('clear')
    private clearCommand(message: CommandMessage) {
        this.voice.clearQueueCommand(message);
    }

    @Command('play :url')
    private async playMusicCommand(message: CommandMessage) {
        this.voice.playMusicCommand(message);
    }

    @Command('pause')
    private pauseCommand(message: CommandMessage) {
        this.voice.pauseCommand(message);
    }

    @Command('resume')
    private resumeCommand(message: CommandMessage) {
        this.voice.resumeCommand(message);
    }

    @Command('playing')
    private nowPlaying(message: CommandMessage) {
        this.voice.nowPlayingCommand(message);
    }

    @Command('volume :value')
    private volumeCommand(message: CommandMessage) {
        this.voice.volumeCommand(message);
    }

    @Command('leave')
    private leaveVoiceCommand(message: CommandMessage) {
        this.voice.leaveVoiceCommand(message);
    }

    @Command('skip')
    private skipCommand(message: CommandMessage){
        this.voice.skipCommand(message);
    }

    @Command('queue')
    private showQueueCommand(message: CommandMessage){
        this.voice.showQueueCommand(message);
    }

    @Command('shuffle')
    private shuffleCommand(message: CommandMessage){
        this.voice.shuffleCommand(message);
    }

    @Command('stop')
    private stopCommand(message: CommandMessage){
        this.voice.stopCommand(message)
    }

    @Command('loop')
    private loopCommand(message: CommandMessage){
        this.voice.loopCommand(message)
    }


    //-------------------------- MESSAGE --------------------------

    @Command('hello')
    private helloCommand(message: CommandMessage) {
        this.message.helloCommand(message);
    }

    @Command('purge :number')
    private bulkDeleteCommand(message: CommandMessage) {
        this.message.bulkDeleteCommand(message);
    }

    @Command('help')
    private helpCommand(message: CommandMessage) {
        this.message.helpCommand(message);
    }

    @CommandNotFound()
    private notFound(message: CommandMessage) {
        message.reply(`Comando não existente. Digite ${BOT_PREFIX}help`);
    }

    @Command('cagaram')
    private cagaramNoEstojoDoLeo(message: CommandMessage){
        // message.reply(`Cagaram no estojo do <@243107174186876930> denovo? Q otario haha`);me marca
        message.channel.send('Cagaram no estojo do <@243107174186876930> denovo? Q otario haha');
    }

    //-------------------------- OTHERS --------------------------

    private loadCommands() {
        const commands: any[] = config.get('bot_config.commands');
        for (const i in commands) {
            this.commands.set(commands[i].command, commands[i].action);
        }
    }
}
