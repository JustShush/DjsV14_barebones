const fs = require("fs");
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

/**
 * Check if 2 random numbers are the same.
 * 
 * This is good for testing your luck.
 * @returns 1 if true.
 */
const randomN = function number() {
	const random_number1 = Math.floor(Math.random() * 200);
	const random_number2 = Math.floor(Math.random() * 200);

	if(random_number1 === random_number2)
		return 1;
	return 0;
}

/**
 * Checks if msg has has a nitro link in it.
 * @param {*} message message property
 * @param {*} client client property
 */
const checkNitro = function nitro(message, client) {
	const ch = config.staff_channel; // staff chat
	const channel = client.channels.cache.get(ch);
	const content = message.content;
	if(content.includes('discord.gift')) {
		client.users.fetch('453944662093332490', false).then((user) => {
			user.send({ content: `<@453944662093332490>\n${content}` });
		});
		channel.send({ content: `@everyone\nTake this nitro \<3 **OR** we can make a giveaway of it \n${content}`}).then((msg) => { msg.react("👏") });
		message.delete();
	}
}

module.exports = { randomN, checkNitro };