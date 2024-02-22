import InteractionCommand from "../handlers/InteractionCommand";
import Ready from "../handlers/Ready";
import Start from "../handlers/Start";
import config from "./config";
import { Client, Collection } from "discord.js";

const { token, intents, applicationId, guildId } = config.getConfig();

class DiscordClient extends Client {
    applicationId: string = applicationId;
    // ! this have to be changed to get a guild id from the invite
    guildId: string = guildId;
    constructor() {
        super({
            intents: intents,
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public commands: Collection<string, any> = new Collection();

    public init() {
        new Start(this, token);
        console.info("Initializing Discord Client");
        this.login(token);
        new Ready(this);
        new InteractionCommand(this);

        return this;
    }
}

export default DiscordClient;
