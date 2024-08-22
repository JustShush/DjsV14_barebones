const color = require('colors');
const { Client, Events, ActivityType } = require("discord.js");
const { connect } = require("mongoose");

module.exports = {
	name: Events.ClientReady,
	once: true,
	/**
	 * @param {Client} client
	 */
	async execute(client) {

		const options = [{
			type: ActivityType.Watching,
			text: `Over {servers} servers! 🙂`,
			status: "online",
		}, {
			type: ActivityType.Listening,
			text: " /help | yourbestbot.pt/support",
			status: "online"
		}, {
			type: ActivityType.Watching,
			text: `Over {users} Users!`,
			status: "online"
		}, {
			type: ActivityType.Listening,
			text: `new updates soon™`,
			status: "idle"
		}];

		let i = -1;
		setInterval(() => {
			i++;
			if (!options[i]) i = 0;
			client.user.setPresence({
				activities: [{
					name: options[i].text.replaceAll('{users}', client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)).replaceAll('{servers}', client.guilds.cache.size),
					type: options[i].type,
				}],
				status: options[i].status,
			})
		}, 5 * 60 * 1000);

		client.guilds.cache.forEach(guild => {
			console.log(`${guild.name} | ${guild.id} | ${guild.memberCount} Members`.brightRed);
		})

		connect(client.config.MONGO_URI, {}).then(() => console.log("Connected to mongoDB".brightGreen));

		console.log(`${client.user.username} is online!\nIn ${client.guilds.cache.size} Servers!`.brightMagenta.bold);
	}
}
