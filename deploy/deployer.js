const node_ssh = require('node-ssh');
const ssh = new node_ssh();
const waterfall = require('async-waterfall');
const colors = require('colors');
const projectPath = require('./config-path');
const cmdLists = require('./config-deployment');
const environment = process.argv.slice(2)[0];

module.exports = async (server) => {
	return new Promise(async (resolve, reject) => {
		try {
			deployment = (environment == 'prod' || environment == 'production') ? 'production' : 'development';

			console.log(` Deployment environment : ${deployment} `.black.bgYellow);
			console.log(` Deployment path : ${projectPath[deployment]} `.black.bgYellow);
			console.log(` Server : ${server.host} `.black.bgYellow);
			console.log(` Port : ${server.port} `.black.bgYellow);

			await ssh.connect(server);
			console.log(`\n Connected to ${server.host} `.black.bgGreen);

			const functions = [];
			commands = cmdLists[deployment];

			commands.forEach(command => {
				functions.push(async (callback) => {
					console.log(`\n > ${command} `.black.bgGreen);
					const result = await ssh.execCommand(command, { cwd: projectPath[deployment] });
					console.log(result.stdout);
					callback(null);
				})
			})

			waterfall(functions, (err) => {
				resolve();
				ssh.dispose();
			})
		}
		catch (err) {
			reject(err);
		}
	});
}