import TConfig from "../types/TConfig";

class config {
    public static getConfig(): TConfig {
        return {
            applicationId: process.env.APPLICATION_ID,
            publicKey: process.env.PUBLIC_KEY,
            token: process.env.TOKEN,
            intents: process.env.INTENTS ? parseInt(process.env.INTENTS) : null,
            guildId: process.env.GUILD_ID
        };
    }
}

export default config;
