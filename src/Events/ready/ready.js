const color = require("colors");
const { ActivityType } = require("discord.js");
const { INEM_checker } = require("../../funcs/inem_checker.js");

module.exports = async (client) => {

	let status = [
		{
			name: "Check this out!",
			type: ActivityType.Streaming,
			url: "https://twitch.tv/justshush_"
		},
		{
			name: "Testing!"
		},
		{
			name: "over the chat",
			type: ActivityType.Watching
		},
		{
			name: "to what you are all saying.",
			type: ActivityType.Listening
		}
	]

	setInterval(() => {
		let random = Math.floor(Math.random() * status.length);
		client.user.setActivity(status[random]);
	}, 1 * 60 * 1000);

	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id} | ${guild.memberCount} members`.brightRed);
	})

	console.log(`${client.user.username} bot is online!`.brightMagenta.bold);
};
