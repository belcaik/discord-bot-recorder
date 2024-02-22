import DiscordClient from "../config/DiscordClient";
import THandler from "../types/THandler";
import { Collection, Events, Interaction } from "discord.js";

export default class InteractionCommand implements THandler {
    client: DiscordClient;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    commands: Collection<string, any>;

    constructor(client: DiscordClient) {
        this.client = client;
        this.name = "interaction";
        this.commands = this.client.commands;
        this.init();
    }

    // ? for some reason this is taking too long to execute +300ms and throw a timeout randomly
    // TODO: investigate why this is taking too long to execute and fix it
    async callback(interaction: Interaction) {
        console.time("interaction");
        if (!interaction.isChatInputCommand()) return;

        await interaction.deferReply({ ephemeral: true });
        try {
            const commandName = interaction.commandName;
            const command = this.commands.get(commandName);

            if (!command) {
                console.error("Command not found");
                return;
            }

            await command.execute(interaction);
            console.timeEnd("interaction");
        } catch (error) {
            console.error("error trying execute", error);
            console.timeEnd("interaction");
            interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }

    init() {
        console.info("starting handler InteractionCommand");
        // console.log('client.commands', this.client.commands);
        this.client.on(Events.InteractionCreate, this.callback);
    }
}
