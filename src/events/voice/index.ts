import config from 'config';
import { StreamDispatcher, VoiceConnection } from "discord.js";
import { CommandMessage, CommandNotFound, Client } from "@typeit/discord";
import { StreamTransportOptions } from 'winston/lib/winston/transports';
const ytdl = require('ytdl-core');

export default class Voice {
    private actualChannel: CommandMessage | undefined;
    private player: VoiceConnection | undefined;
    private dispatcher: StreamDispatcher | undefined;
    private readonly blacklist: any;
    private readonly whitelist: any;
    private queue: string[];
    constructor() {
        this.blacklist = config.get('bot_config.blacklist');
        this.whitelist = config.get('bot_config.whitelist');
        this.queue = [];
    };

    public clearQueueCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        this.queue = [];
        message.reply('Lista de Música limpa.');
    }

    public async playMusicCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        message.delete({reason: 'delete play command'});
        this.player = await message.member?.voice.channel?.join();
        this.queue.push(message.args.url);
        if (this.queue.length < 2) {
            this.actualChannel = message;
            this.playMusic();
        }
    }

    private playMusic() {
        if(this.actualChannel) this.actualChannel.reply(`Agora está tocando ${this.queue[0]}`);
        this.player?.play(ytdl(this.queue[0])).on('finish', () => {
            this.queue = this.queue.splice(1);
            if (this.queue.length !== 0) this.playMusic();
        });
    }

    public skipCommand(message: CommandMessage){
        if (!this.whitelist[message.channel.id]) return;
        if(this.queue.length > 2){
            this.queue = this.queue.splice(1);
            this.playMusic();
        } else {
            message.member?.voice.channel?.leave();
        }
    }

    public pauseCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        this.player?.dispatcher.pause();
        message.reply('pausado.');
    }

    public resumeCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        this.player?.dispatcher?.resume();
        message.reply('resumido.');
    }

    public nowPlayingCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        // this.dispatcher?.
    }

    public volumeCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        let bool: any = message.args.value > 100 ? ((message.args.value = 100) / 100) : (message.args.value / 100);
        if (bool < 0) bool = 0;
        this.dispatcher?.setVolume(bool);
        message.reply(`Colocando o volume em ${bool * 100}%`);
    }

    public leaveVoiceCommand(message: CommandMessage) {
        if (!this.whitelist[message.channel.id]) return;
        message.member?.voice.channel?.leave();
    }


}