const Discord = require('discord.js');
const color = require('../color.json').color;

module.exports = {
    name: 'leave',
    description: 'Leaves a server',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        const guild = interaction.options?.find(c => c?.name === 'guild_id')?.value;

        const guildl = await client.guilds.cache.get(guild).leave()

        const embed = new Discord.MessageEmbed()
        .setTitle(`${require('../emojis.json').x} Left the guild!`)
        .setColor(color)
        .setDescription(`Left guild ${guildl.name} (${guildl.id})`)
        .addField(`${require('../color.json').links_blank}‎`, `${require('../color.json').links}‎`)
        await interaction.reply({ embeds: [embed] });
    }
}