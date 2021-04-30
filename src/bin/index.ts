import Server from '../server/index';
import bindContainers from '../bin/container';
import Mongo from './database';

export const start = () => {

  let container = bindContainers();
  //Inicialização HTTP
  container.get<Server>(Server)
  //Inicialização mongo
//   container.get<Mongo>(Mongo);
};

export default start();
