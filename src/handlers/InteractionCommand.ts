import DiscordClient from "@config/DiscordClient";
import { TCommand, THandler } from "@types";
import {
    ChatInputCommandInteraction,
    Collection,
    Events,
    Interaction,
} from "discord.js";

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
        console.timeLog("interaction");
        if (!interaction.isChatInputCommand()) return;

        const chatInteraction = interaction as ChatInputCommandInteraction;
        try {
            // await chatInteraction.deferReply();
            const commandName = chatInteraction.commandName;
            // console.timeLog("interaction", "commandName", commandName);

            const command: TCommand = this.commands.get(commandName);
            // console.timeLog("interaction", "command", command);
            if (!command) return;

            await command.execute(chatInteraction);

            console.timeEnd("interaction");
        } catch (error) {
            console.error("error trying execute", error);
            console.timeEnd("interaction");
        }
    }

    init() {
        console.info("starting handler InteractionCommand");
        // console.log('client.commands', this.client.commands);
        this.client.on(Events.InteractionCreate, this.callback);
    }
}
