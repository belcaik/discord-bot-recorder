import config from "./config";
import { Client } from "discord.js";

const { token, intents } = config.getConfig();


class DiscordClient extends Client {
    constructor() {
        super({
            intents: intents
        });
    
        
    }
    public init() {
        console.info("Initializing Discord Client");
        this.login(token);
        return this;
    }
}




export default DiscordClient;
