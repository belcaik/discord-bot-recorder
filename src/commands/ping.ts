import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    async execute(interaction: ChatInputCommandInteraction) {
        try {
            await interaction.editReply("Pong!");
        } catch (error) {
            throw new Error(error);
        }
    },
};
