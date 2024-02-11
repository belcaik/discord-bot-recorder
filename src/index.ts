import "dotenv/config";
import DiscordClient from "./config/client";


console.log("funka, World!");

const client = new DiscordClient();
client.init();

console.log("no funka, World!");
