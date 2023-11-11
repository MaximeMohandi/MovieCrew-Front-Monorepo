type EnvironnementVariable = {
  NODE_ENV: string;
  BOT_TOKEN: string;
  BOT_GUILD: string;
  API_CLIENT_ID: number;
  API_KEY: string;
};

const { BOT_TOKEN, BOT_GUILD, API_CLIENT_ID, API_KEY, NODE_ENV } = process.env;
if (!BOT_TOKEN || !BOT_GUILD || !API_CLIENT_ID || !API_KEY || !NODE_ENV) {
  throw Error("Could not find envrionment variables");
}

export const env = process.env as unknown as EnvironnementVariable;
