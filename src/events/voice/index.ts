import config from 'config';
import { Message } from "discord.js";
import { SimpleCommandMessage } from "discordx"
import { StreamTransportOptions } from 'winston/lib/winston/transports';
import { monitorEventLoopDelay } from 'node:perf_hooks';
import { repeat } from 'lodash';
const ytdl = require('ytdl-core');

export default class Voice {
    private actualChannel: SimpleCommandMessage | undefined;
    // private player: VoiceConnection | undefined;
    // private dispatcher: StreamDispatcher | undefined;
    private readonly blacklist: any;
    private readonly whitelist: any;
    private queue: string[];
    constructor() {
        this.blacklist = config.get('bot_config.blacklist');
        this.whitelist = config.get('bot_config.whitelist');
        this.queue = [];
    };

    public clearQueueCommand(message: Message) {
        if (!this.whitelist[message.channel.id]) return;
        this.clearQueueTool();
        message.reply('Lista de Música limpa.');
    }

    public async playMusicCommand(url: string | undefined, message: Message) {
        if (!this.whitelist[message.channel.id]) return;
        if(!url) return;
        message.channel.delete('delete play command');
        // this.player = await message.member?.voice.channel?.join();
        this.queue.push(url);

        if (this.queue.length < 2) {
            // this.actualChannel = message;
            this.playMusic();
        }
    }

    private playMusic() {
        // if(this.actualChannel) this.actualChannel.message.reply(`Agora está tocando ${this.queue[0]}`);
        // this.player?.play(ytdl(this.queue[0])).on('finish', () => {
        //     this.queue = this.queue.splice(1);
        //     if (this.queue.length !== 0) this.playMusic();
        // });
    }

    public skipCommand(message: Message){
        // if (!this.whitelist[message.channel.id]) return;
        // if(this.queue.length > 2){
        //     this.queue = this.queue.splice(1);
        //     this.playMusic();
        // } else {
        //     this.clearQueueTool();
        //     // message.member?.voice.channel?.leave();
        // }
    }

    public stopCommand(message: Message){
        // if (!this.whitelist[message.channel.id]) return;
        // this.player?.dispatcher.end();
        // this.clearQueueTool();
        // message.reply(`Parei de tocar? Bota outro som ae :D`)
    }

    public shuffleCommand(message: Message){
        if (!this.whitelist[message.channel.id]) return;
        // this.queue = this.shuffle(this.queue);
    }

    public showQueueCommand(message: Message){
        if (!this.whitelist[message.channel.id]) return;
        if(this.queue.length < 1) message.reply('Não há itens na fila de musica.');
        else {
            let text = '';
            for(const i in this.queue) {
                let iAux = parseInt(i) + 1;
                if(iAux === 1) text += `${iAux}. ${this.queue[i]} <---Now Playing\n`
                else text += `${iAux}. ${this.queue[i]}\n`;
            }
            message.channel.send("```" + text + "```");
        }
    }

    public pauseCommand(message: Message) {
    //     if (!this.whitelist[message.channel.id]) return;
    //     this.player?.dispatcher.pause();
    //     message.reply('pausado.');
    }

    public resumeCommand(message: Message) {
        // if (!this.whitelist[message.channel.id]) return;
        // this.player?.dispatcher?.resume();
        // message.reply('resumido.');
    }

    public nowPlayingCommand(message: Message) {
        if (!this.whitelist[message.channel.id]) return;
        // to@do
    }

    public loopCommand(message: Message){
        if (!this.whitelist[message.channel.id]) return;
        //to@do
   }


    public volumeCommand(value: number | undefined, message: Message) {
        if (!this.whitelist[message.channel.id]) return;
        if (!value) return;
        let bool: any = value > 100 ? ((value = 100) / 100) : (value / 100);
        if (bool < 0) bool = 0;
        // this.dispatcher?.setVolume(bool);
        message.reply(`Colocando o volume em ${bool * 100}%`);
    }

    public leaveVoiceCommand(message: Message) {
        if (!this.whitelist[message.channel.id]) return;
        this.clearQueueTool();
        // message.member?.voice.channel?.leave();
    }

    private shuffle(a: string[]) {
        // let aux = a.shift();
        // for (let i = a.length - 1; i > 0; i--) {
        //     if(i === 0) continue;
        //     const j = Math.floor(Math.random() * (i + 1));
        //     [a[i], a[j]] = [a[j], a[i]];
        // }
        // if(aux) a.unshift(aux);
        // if(this.actualChannel)(this.showQueueCommand(this.actualChannel))
        // return a;
    }

    private clearQueueTool() {
        this.queue = [];
    }
}
