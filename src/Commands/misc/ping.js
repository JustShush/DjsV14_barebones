module.exports = {
  name: 'ping',
  description: 'Pong!',
  // devOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,

  execute: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
