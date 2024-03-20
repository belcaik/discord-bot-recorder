import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { pipeline } from "node:stream";
import { EndBehaviorType, VoiceReceiver } from "@discordjs/voice";
import type { User } from "discord.js";
import * as prism from "prism-media";

class ListeningStream {
    private static instance: ListeningStream;

    private constructor() {}

    public static getInstance(): ListeningStream {
        if (!ListeningStream.instance) {
            ListeningStream.instance = new ListeningStream();
        }
        return ListeningStream.instance;
    }

    public createListeningStream(
        receiver: VoiceReceiver,
        userId: string,
        user?: User,
        recordStartTimestamp?: number
    ) {
        const opusStream = receiver.subscribe(userId, {
            end: {
                behavior: EndBehaviorType.AfterSilence,
                duration: 1000,
            },
        });

        const oggStream = new prism.opus.OggLogicalBitstream({
            opusHead: new prism.opus.OpusHead({
                channelCount: 2,
                sampleRate: 48000,
            }),
            pageSizeControl: {
                maxPackets: 10,
            }
        });

        const directoryName = `./recordings/${recordStartTimestamp}`;

        // Create the directory if it does not exist
        if (!existsSync(directoryName)) {
            mkdirSync(directoryName, { recursive: true });
        }

        const filename = `${directoryName}/${Date.now()}-${this.getDisplayName(
            userId,
            user
        )}.ogg`;

        const out = createWriteStream(filename);

        pipeline(opusStream, oggStream, out, (err) => {
            if (err) {
                console.warn(
                    `❌ Error recording file ${filename} - ${err.message}`
                );
            } else {
                console.log(`✅ Recorded ${filename}`);
            }
        });
    }

    private getDisplayName(userId: string, user?: User) {
        return user ? `${user.username}_${user.discriminator}` : userId;
    }
}

export default ListeningStream.getInstance();
