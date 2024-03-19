import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import {TCommand} from "@types";

export default class Ping implements TCommand {
    private static instance: Ping;
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    private constructor() {
        this.data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with Pong!");
        this.execute = async (interaction: ChatInputCommandInteraction) => {
            try {
                console.timeLog("interaction", "inside ping command");
                if (interaction.deferred || interaction.replied) {
                    interaction.editReply("Pong!");
                    return;
                }
                await interaction.reply("Pong!");
            } catch (error) {
                console.error("error trying execute", error);
            }
        };
    }

    static getInstance() {
        if (!Ping.instance) {
            Ping.instance = new Ping();
        }
        return Ping.instance;
    }
}
