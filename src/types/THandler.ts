import DiscordClient from "@config/DiscordClient";

export default interface THandler {
    client: DiscordClient;
    name: string;
    callback: (...args) => void;
}
