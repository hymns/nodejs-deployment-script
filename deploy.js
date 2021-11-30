const connect = require("./deploy/deployer");
const waterfall = require("async-waterfall");
const serverLists = require('./deploy/config-server');
const functions = [];
const environment = process.argv.slice(2)[0];

if (environment == 'prod' || environment == 'production')
   servers = serverLists['production'];
else
   servers = serverLists['development'];

servers.forEach((server) => {
   functions.push(async (callback) => {
      await connect(server);
      callback(null);
   });
});

waterfall(functions);
