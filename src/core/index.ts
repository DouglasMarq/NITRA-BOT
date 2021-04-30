
import { inject, injectable } from "inversify";
import Events from "../events";
import config from 'config';
import { Discord } from "@typeit/discord";

@Discord(config.get('bot_config.prefix'))
@injectable()
export default class Core {
    constructor(@inject(Events) private readonly events: Events
    ) {

    }
}
