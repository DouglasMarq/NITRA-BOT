import {Service} from 'typedi';
import {CommandHandler} from './CommandHandler';
import PingCommandHandler from './handlers/PingCommandHandler';
import RollCommandHandler from './handlers/RollCommandHandler';
import {CommandsEnums} from '@/helpers/CommandsEnums';

@Service()
export class CommandHandlerMap {
  private handlers: Map<string, CommandHandler>;

  constructor(
    private pingHandler: PingCommandHandler,
    private rollHandler: RollCommandHandler,
  ) {
    this.handlers = new Map();
    this.registerHandlers();
  }

  private registerHandlers(): void {
    this.handlers.set(CommandsEnums.PING, this.pingHandler);
    this.handlers.set(CommandsEnums.ROLL, this.rollHandler);
  }

  public getHandler(commandName: string): CommandHandler | undefined {
    return this.handlers.get(commandName);
  }
}
