import {
    SlashCommandBuilder,
    CommandInteraction,
    GuildMember,
    SlashCommandSubcommandsOnlyBuilder,
    VoiceState,
    CommandInteractionOptionResolver,
} from "discord.js";
import {
    VoiceConnection,
    VoiceConnectionStatus,
    entersState,
    joinVoiceChannel,
} from "@discordjs/voice";
import TCommand from "../types/TCommand";
import TConnectionOptions from "../types/TConnectionOptions";

export default class Record implements TCommand {
    private static instance: Record;
    data: SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
    private connection: VoiceConnection;
    private voiceState: VoiceState;

    private constructor() {
        this.data = new SlashCommandBuilder()
            .setName("record")
            .setDescription("Record a call")
            .addSubcommand((subcommand) =>
                subcommand.setName("start").setDescription("Start recording")
            )

            .addSubcommand((subcommand) =>
                subcommand.setName("stop").setDescription("Stop recording")
            );

        this.execute = async (interaction: CommandInteraction) => {
            console.timeLog("interaction", "inside record command");
            await interaction.deferReply();

            const commandOptions =
                interaction.options as CommandInteractionOptionResolver;

            const subcommand = commandOptions.getSubcommand();

            if (subcommand === "start") {
                await this.StartRecording(interaction);
                await interaction.followUp("Recording started!");
                return;
            } else if (subcommand === "stop") {
                this.stopRecording(interaction);
                await interaction.followUp("Recording stopped!");
                return;
            }

            await interaction.followUp("No possible action to take!");
        };
    }

    private async handleConnection(connectionOptions: TConnectionOptions) {
        try {
            this.connection = joinVoiceChannel(connectionOptions);

            await entersState(
                this.connection,
                VoiceConnectionStatus.Ready,
                20e3
            );
        } catch (error) {
            console.error("error trying to handle connection", error);
        }
    }

    private async isUserInVoiceChannel(interaction: CommandInteraction) {
        try {
            if (
                interaction.member instanceof GuildMember &&
                interaction.member.voice.channel
            ) {
                this.voiceState = interaction.member.voice;
                return true;
            } else {
                await interaction.followUp(
                    "You need to join a voice channel first!"
                );
                return false;
            }
        } catch (error) {
            console.error(
                "error trying to check if user is in voice channel",
                error
            );
        }
    }

    private stopRecording(interaction: CommandInteraction) {
        // console.log("stop recording");
        console.info(interaction);
        try {
            if (this.connection) {
                this.connection.destroy();
            }
        } catch (error) {
            console.error("error trying to stop recording", error);
        }
    }

    private async StartRecording(interaction: CommandInteraction) {
        try {
            const isUserInVoiceChannel = await this.isUserInVoiceChannel(
                interaction
            );

            if (!isUserInVoiceChannel) {
                return;
            }

            const connectionOptions: TConnectionOptions = {
                channelId: this.voiceState.channelId,
                guildId: interaction.guildId,
                selfDeaf: true,
                selfMute: false,
                adapterCreator: interaction.guild?.voiceAdapterCreator,
            };

            await this.handleConnection(connectionOptions);

            if (this.connection) {
                this.handleReceiver();
            }
        } catch (error) {
            console.error("error trying execute", error);
        }
    }

    private handleReceiver() {
        try {
            const receiver = this.connection.receiver;

            receiver.speaking.on("start", (userId) => {
                console.log("start", userId);
            });

            receiver.speaking.on("end", (userId) => {
                console.log("end", userId);
            });
        } catch (error) {
            console.error("error trying to handle receiver", error);
        }
    }

    static getInstance() {
        if (!Record.instance) {
            Record.instance = new Record();
        }
        return Record.instance;
    }
}
