export = {
  database: {
    main: {
      host: process.env.DB_HOST || 'host',
      port: process.env.DB_PORT || 'port',
      name: process.env.DB_NAME || 'name',
      user: process.env.DB_USER || 'user',
      pass: process.env.DB_PASS || 'pass',
    },
},
server: {
  port: process.env.SERVER_PORT || 3001,
  host: process.env.SERVER_HOST || '127.0.0.1',
  name: process.env.SERVER_NAME || 'MEAN-Starter',
  socket: {
    port: process.env.SERVER_SOCKET_PORT || 443,
  },
  },
  secrets: {
    secret: '',
    jwt_secret: '',
    token: process.env.DISCORD_TOKEN
  },
  bot_config: {
    prefix: process.env.BOT_PREFIX,
    commands: {
        help: {

        }
    }
  },
};
