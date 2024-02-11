import config from "./config";
import { Client, Collection } from "discord.js";

const { token, intents } = config.getConfig();


class DiscordClient extends Client {
    constructor() {
        super({
            intents: intents
        });   
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public commands: Collection<string, any> = new Collection();


    public init() {
        console.info("Initializing Discord Client");
        this.login(token);
        return this;
    }
}




export default DiscordClient;
