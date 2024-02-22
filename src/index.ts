import "dotenv/config";
import DiscordClient from "./config/DiscordClient";
import { ping } from "./commands";
import { config } from "./config";
import { REST, Routes, Events } from "discord.js";

const { token, applicationId, guildId } = config.getConfig();

const commands = [ping.data.toJSON()];

const rest = new REST().setToken(token);

(async () => {
    console.log("Started refreshing application (/) commands.");
    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(
            Routes.applicationGuildCommands(applicationId, guildId),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();


const client = new DiscordClient();
client.commands.set(ping.data.name, ping);

client.init();
client.commands.set(ping.data.name, ping);


client.on(Events.InteractionCreate, async (interaction) => {
    console.log("interaction", interaction);
    if (!interaction.isChatInputCommand()) return;

    const commandName = interaction.commandName;
    const command = client.commands.get(commandName);

    if (!command) {
        console.error("Command not found");
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});