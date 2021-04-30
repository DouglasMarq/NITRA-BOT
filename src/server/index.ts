import 'reflect-metadata';
import { Client } from "@typeit/discord"
import { inject, injectable } from 'inversify';
import Log from '../util/log';
import config from 'config'
import Core from '../core';

@injectable()
export default class Server {
    Client: Client;
    constructor(
        @inject(Log) private readonly log: Log,
        @inject(Core) private readonly core: Core
        ) {
        this.log = log;
        this.log.debug('Iniciando..........');
        this.Client = new Client();
        this.Client.login(config.get('secrets.token'));
    }
}

