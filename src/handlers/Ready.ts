import DiscordClient from "../config/DiscordClient";
import THandler from "../types/THandler";

export default class Ready implements THandler {
    client: DiscordClient;
    name: string;
    callback: () => void;

    constructor(client: DiscordClient) {
        this.client = client;
        this.name = "ready";
        this.callback = () => {
            console.info(`Logged in as ${this.client.user?.tag}`);
            this.client.user?.setActivity("with ts handler");
        };

        this.init();
    }

    init() {
        this.client.on(this.name, this.callback);
    }
}
