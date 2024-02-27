import {
    SlashCommandBuilder,
    CommandInteraction,
    GuildMember,
} from "discord.js";
import {
    VoiceConnection,
    VoiceConnectionStatus,
    entersState,
    joinVoiceChannel,
} from "@discordjs/voice";
import TCommand from "../types/TCommand";

export default class Record implements TCommand {
    private static instance: Record;
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
    private constructor() {
        this.data = new SlashCommandBuilder()
            .setName("record")
            .setDescription("Record a call");
        this.execute = async (interaction: CommandInteraction) => {
            try {
                console.timeLog("interaction", "inside record command");
                await interaction.deferReply();
                let connection: VoiceConnection;

     

                if (
                    interaction.member instanceof GuildMember
                    && interaction.member.voice.channel
                ) {
                    const voiceState = interaction.member.voice;

                    connection = joinVoiceChannel({
                        channelId: voiceState.channelId,
                        guildId: voiceState.guild.id,
                        selfDeaf: false,
                        selfMute: true,
                        adapterCreator: voiceState.guild.voiceAdapterCreator,
                    });
                } else {
                    await interaction.followUp(
                        "You need to join a voice channel first!"
                    );
                    return;
                }

                await entersState(
                    connection,
                    VoiceConnectionStatus.Ready,
                    20e3
                );

                const receiver = connection.receiver;

                receiver.speaking.on("start", (userId) => {
                    console.log("start", userId);
                });
            } catch (error) {
                console.error("error trying execute", error);
            }
            await interaction.followUp("Ready!");
        };
    }

    static getInstance() {
        if (!Record.instance) {
            Record.instance = new Record();
        }
        return Record.instance;
    }
}
