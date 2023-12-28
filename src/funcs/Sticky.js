const fs = require('fs');

async function sticky(client, message) {
	const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
	settings.sticky.forEach(async e => {
		if (message.channel.id == e.ChannelID) {
			if (message.id != e.MSGID) {
				//* finds the correct object from the array
				const dataFind = settings.sticky.find(o => o.ChannelID == message.channel.id);
				const fetchedMessage = await message.channel.messages.fetch(dataFind.MSGID);
				fetchedMessage.delete();
				// Restore the placeholder string to newline character (\n)
				const newMSG = e.MSG.replace(/\\n/g, '\n');
				const sentMsg = await message.channel.send({ content: newMSG });
				dataFind.MSGID = sentMsg.id;
				fs.writeFileSync('settings.json', JSON.stringify(settings, null, 2));
			}
		}
	});
}

module.exports = { sticky };