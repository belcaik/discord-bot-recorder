import { InternalDiscordGatewayAdapterCreator } from "discord.js";

export default interface TConnectionOptions {
    channelId: string;
    guildId: string;
    selfDeaf: boolean;
    selfMute: boolean;
    adapterCreator: InternalDiscordGatewayAdapterCreator;

}