import { dirname, importx } from "@discordx/importer";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import "dotenv/config";

const client = new Client({
  botId: "moviecrew-discordbot",
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
  ],
  silent: false,
  botGuilds: ["240532039785250816"],
});

client.on("ready", () => {
  console.log(">> Bot started");
  client.clearApplicationCommands("240532039785250816");
  client.initApplicationCommands();
});

client.on("interactionCreate", (interaction) => {
  client.executeInteraction(interaction);
});

await importx(`${dirname(import.meta.url)}/**/**/*.{events,commands}.{ts,js}`);

if (!process.env.BOT_TOKEN) {
  throw Error("Could not find BOT_TOKEN in your environment");
}

client.login(process.env.BOT_TOKEN);
