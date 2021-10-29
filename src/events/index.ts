import { injectable } from "inversify";
import config from 'config';
import { Command, CommandMessage, Discord, CommandNotFound } from "@typeit/discord";
import {SimpleCommand, SimpleCommandMessage, SimpleCommandOption} from 'discordx'
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
    @SimpleCommand('clear')
    private clearCommand(command: SimpleCommandMessage) {
        this.voice.clearQueueCommand(command.message);
    }

    @SimpleCommand('play :url')
    private async playMusicCommand(command: SimpleCommandMessage) {
        this.voice.playMusicCommand(command.message);
    }

    @SimpleCommand('pause')
    private pauseCommand(command: SimpleCommandMessage) {
        this.voice.pauseCommand(command.message);
    }

    @SimpleCommand('resume')
    private resumeCommand(command: SimpleCommandMessage) {
        this.voice.resumeCommand(command.message);
    }

    @SimpleCommand('playing')
    private nowPlaying(command: SimpleCommandMessage) {
        this.voice.nowPlayingCommand(command.message);
    }

    @SimpleCommand('volume :value')
    private volumeCommand(command: SimpleCommandMessage) {
        this.voice.volumeCommand(command.message);
    }

    @SimpleCommand('leave')
    private leaveVoiceCommand(command: SimpleCommandMessage) {
        this.voice.leaveVoiceCommand(command.message);
    }

    @SimpleCommand('skip')
    private skipCommand(command: SimpleCommandMessage){
        this.voice.skipCommand(command.message);
    }

    @SimpleCommand('queue')
    private showQueueCommand(command: SimpleCommandMessage){
        this.voice.showQueueCommand(command.message);
    }

    @SimpleCommand('shuffle')
    private shuffleCommand(command: SimpleCommandMessage){
        this.voice.shuffleCommand(command.message);
    }

    @SimpleCommand('stop')
    private stopCommand(command: SimpleCommandMessage){
        this.voice.stopCommand(command.message)
    }

    @SimpleCommand('loop')
    private loopCommand(command: SimpleCommandMessage){
        this.voice.loopCommand(command.message)
    }


    //-------------------------- MESSAGE --------------------------

    @SimpleCommand('hello')
    private helloCommand(command: SimpleCommandMessage) {
        this.message.helloCommand(command.message);
    }

    @SimpleCommand('purge :number')
    private bulkDeleteCommand(command: SimpleCommandMessage) {
        this.message.bulkDeleteCommand(command.message);
    }

    @SimpleCommand('help')
    private helpCommand(command: SimpleCommandMessage) {
        this.message.helpCommand(command.message);
    }

    @SimpleCommandNotFound()
    private notFound(command: SimpleCommandMessage) {
        message.reply(`Comando não existente. Digite ${BOT_PREFIX}help`);
    }

    @SimpleCommand('cagaram')
    private cagaramNoEstojoDoLeo(command: SimpleCommandMessage){
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
