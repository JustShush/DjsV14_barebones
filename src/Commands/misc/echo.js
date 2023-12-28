const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
	name: 'echo',
	description: 'echo the input.',
	// devOnly: Boolean,
	//deleted: true,
	options: [
		{
		  name: 'echo',
		  description: 'echo the input.',
		  required: true,
		  type: ApplicationCommandOptionType.String,
		},
	],
	// deleted: Boolean,
  
	execute: async (client, interaction) => {
		const {options} = interaction;
		const op = options.getString("echo");
		const msg = op.replace(/\\n/g, '\n');
		const sentMsg = await interaction.channel.send({ content: msg });
		interaction.reply({ content: `Msg id: \`${sentMsg.id}\``, ephemeral: true });
	},
};
