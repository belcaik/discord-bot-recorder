import { REST, Routes } from "discord.js";
import DiscordClient from "@config/DiscordClient";

export default class Start {
    client: DiscordClient;
    name: string;
    rest: REST;

    constructor(client: DiscordClient, token: string) {
        this.client = client;
        this.name = "start";
        this.rest = new REST().setToken(token);
        this.init();
    }

    init() {
        //'
        this.registerCommands()
            .then(() => {
                console.info("Successfully reloaded application (/) commands.");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async registerCommands() {
        try {
                // TODO: check if the commands are already registered
                
            console.info("Started refreshing application (/) commands.");

            const commands = this.client.commands.map((command) => command.data.toJSON());

            // console.log("commands", {appId: this.client.applicationId, guildId: this.client.guildId, commands})


            await this.rest.put(
                Routes.applicationGuildCommands(
                    this.client.applicationId,
                    this.client.guildId
                ),
                { body: commands }
            );
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
