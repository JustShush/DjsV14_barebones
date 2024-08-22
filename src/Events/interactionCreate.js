const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const Schema = require("../schemas/stats.js");
const UserStats = require("../schemas/userStats.js");

module.exports = {
	name: "interactionCreate",
	/**
	 *  @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command)
			return interaction.reply({
				content: "This command is outdated.",
				ephemeral: true,
			});

		try {
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			console.log(
				`\nGuild: ${interaction.guild.name}\nChannel: "${interaction.channel.name}"\nCommand: "${command.name}"\nUser: ${interaction.user.tag}`
					.brightRed
			);
			const errorEmbed = new EmbedBuilder()
				.setTitle('An error occured')
				.setDescription(`${error}`)
				.setColor('Red');

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
			} else {
				await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
			}
		}
	},
};
