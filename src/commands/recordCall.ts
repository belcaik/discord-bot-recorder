import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";


export default {
    data: new SlashCommandBuilder()
        .setName('record')
        .setDescription('Record a call'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!');
    },
}