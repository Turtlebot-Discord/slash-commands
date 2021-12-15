const Discord = require('discord.js');
const br = require('../models/button-roles');

module.exports = {
    name: 'interactionCreate',
    /**
     * @param {Discord.ButtonInteraction} interaction 
     * @param {Discord.Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isButton()) return

        if (isNaN(Number(interaction.customId))) return
        const results = await br.findOne({
            guild: interaction.guild.id,
            messageID: interaction.message.id
        })

        let role;

        const roleArray = [results.roles?.r1, results.roles?.r2, results.roles?.r3, results.roles?.r4, results.roles?.r5, results.roles?.r6, results.roles?.r7, results.roles?.r8]

        for (const roleId of roleArray) {
            if (roleId === interaction.customId) {
                role = roleId
            }
        }
        if(!role) { console.log("Error while getting role!")
            return interaction.reply({ content: `Error while getting role!`, ephemeral: true })
        }

        /**
         * @type {Discord.Role}
         */
        const rresults = interaction.guild.roles.cache.get(role)

        /**
         * @type {Discord.TextChannel}
         */
        const permChannel = interaction.channel
        permChannel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
            USE_EXTERNAL_EMOJIS: true
        });
        let textt;
        let ltype;
        if (interaction.member.roles.cache.has(rresults.id)) {
            interaction.member.roles.remove(rresults.id)
            ltype = "REMOVE"
            textt = `${require('../emojis.json').flag_remove} Removed the ${rresults} role!`
        } else {
            interaction.member.roles.add(rresults.id)
            ltype = "ADD"
            textt = `${require('../emojis.json').flag_add} Added the ${rresults} role!`
        }

        interaction.reply({ content: textt, ephemeral: true });

        const brLog = require('../buttonLogger')

        const brlogger = await new brLog({ message: interaction.message, member: interaction.member, role: rresults }).log(client, ltype)
    }
};