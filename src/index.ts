import "dotenv/config";
import DiscordClient from "./config/DiscordClient";
import { ping, recordCall } from "./commands";

const client = new DiscordClient();
client.commands.set(ping.data.name, ping);
client.commands.set(recordCall.data.name, recordCall);

client.init();
