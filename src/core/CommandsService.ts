import {Service} from 'typedi';

@Service()
export default class CommandsService {
  getCommands() {
    return [
      {
        name: 'ping',
        description: 'Replies with Pong!',
      },
    ];
  }
}
