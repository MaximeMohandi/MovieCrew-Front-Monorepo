/* eslint-disable no-console */
import { dirname, importx } from "@discordx/importer";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import { authenticateApp } from "moviecrew-api";
import { setUpEnvironment } from "./config";

console.info(">> Starting bot");
console.info(">> Setting up environment variables");
const env = setUpEnvironment();

console.info(">> Connecting to database");

await authenticateApp(env.API_URL, env.API_CLIENT_ID, env.API_KEY);

const client = new Client({
  botId: "moviecrew-discordbot",
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
  ],
  silent: false,
  botGuilds: [env.BOT_GUILD],
});

client.on("ready", () => {
  console.info(">> Bot started");
  client.clearApplicationCommands(env.BOT_GUILD);
  client.initApplicationCommands();
});

client.on("interactionCreate", (interaction) => {
  client.executeInteraction(interaction);
});

await importx(`${dirname(import.meta.url)}/**/**/*.{events,commands}.{ts,js}`);

client.login(env.BOT_TOKEN);
