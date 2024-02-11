import "dotenv/config";
import DiscordClient from "./config/client";
import ping from "./commands/ping";
import config from "./config/config";
import { REST, Routes, Events } from "discord.js";


const {token, applicationId, guildId} = config.getConfig();

const commands = [ping.data.toJSON()];


const rest = new REST().setToken(token);





console.log("funka, World!");

const client = new DiscordClient();
client.commands.set(ping.data.name, ping);

client.init(); 
client.commands.set(ping.data.name, ping);

client.on("ready", () => {
    console.info(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("with ts");
});


client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});


console.log("no funka, World!");

(async ()=>{
    console.log('Started refreshing application (/) commands.');   
    try {
        console.log('Started refreshing application (/) commands.');
        console.log(commands);
        await rest.put(
            Routes.applicationGuildCommands(applicationId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
