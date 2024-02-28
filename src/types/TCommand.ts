import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export default interface TCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    // getInstance?: () => TCommand;
}