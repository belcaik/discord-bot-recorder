import "dotenv/config";
import DiscordClient from "./config/DiscordClient";
import { ping, recordCall } from "./commands";

const client = new DiscordClient();


const pingCommand = ping.getInstance();
const recordCommand = recordCall.getInstance();


client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(recordCommand.data.name, recordCommand);
// client.commands.set(recordCall.data.name, recordCall);

client.init();


// ON process exit
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
    client.destroy();
});

// ON process interrupt
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();
});

// on non-caught exceptions

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});