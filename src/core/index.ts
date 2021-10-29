
import { inject, injectable } from "inversify";
import Events from "../events";
import config from 'config';
import { Client, Discord } from "discordx";

@Discord()
@injectable()
export default class Core {
    private core: Client
    constructor(@inject(Events) private readonly events: Events
    ) {
        // Look into this bug or programming error, otherwise report it at discordx github!
        // @ts-ignore
        this.core = new Client({ botId: 'NITRA Bot' });
        this.core.login(config.get('secrets.token'));
    }
}
