import config from "./config";
import { Client } from "discord.js";

const { applicationId, publicKey } = config.getConfig();

export default {
    applicationId,
    publicKey,
};
