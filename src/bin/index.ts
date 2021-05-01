import Server from '../server/index';
import bindContainers from '../bin/container';
import Mongo from './database';
import http from '../util/http';

export const start = () => {

  let container = bindContainers();
  //Inicialização HTTP
  container.get<Server>(Server);
//   container.get<http>(http);
  //Inicialização mongo
//   container.get<Mongo>(Mongo);
};

export default start();
