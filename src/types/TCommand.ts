import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface TCommand {
    data: SlashCommandBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    // getInstance?: () => TCommand;
}