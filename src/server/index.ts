import 'reflect-metadata';
import { Client } from "@typeit/discord"
import { inject, injectable } from 'inversify';
import Log from '../util/log';
import config from 'config'
import Core from '../core';
import http from '../util/http';

@injectable()
export default class Server {
    Client: Client;
    private readonly log: Log;
    private readonly core: Core;
    constructor(
        @inject(Log) log: Log,
        @inject(Core) core: Core,
        ) {
        this.core = core;
        this.log = log;
        this.log.debug('Iniciando..........');
        this.Client = new Client();
        this.Client.login(config.get('secrets.token'));
    }
}

