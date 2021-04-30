import { inject, injectable } from "inversify";
import config from 'config';
import { Discord } from "@typeit/discord";
import Message from "./message";

@Discord(config.get('bot_config.prefix'))
@injectable()
export default class Events {
    constructor(@inject(Message) private readonly message: Message) {

    }
}
