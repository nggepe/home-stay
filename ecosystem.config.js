// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
require('dotenv').config();

const port = process.env.PM2_PORT || 3000;

module.exports = {
  apps: [
    {
      name: process.env.PM2_NAME || 'home-stay',
      script: `npm start -- -p ${port}`,
      error_file: 'log/error.log',
      out_file: 'log/out.log',
      args: '',
      node_args: '--tls-min-v1.0',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
    },
  ],
  deploy: {},
};
