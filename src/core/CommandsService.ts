import {Service} from 'typedi';
import {CommandsEnums} from '@/helpers/CommandsEnums';

@Service()
export default class CommandsService {
  getCommands() {
    return [
      {
        name: CommandsEnums.PING,
        description: 'Replies with Pong!',
      },
      {
        name: CommandsEnums.ROLL,
        description: 'Roll a dice between 1-6!',
      },
    ];
  }
}
