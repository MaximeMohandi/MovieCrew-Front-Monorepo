import "dotenv/config";

type EnvironnementVariable = {
  NODE_ENV: string;
  BOT_TOKEN: string;
  BOT_GUILD: string;
  API_URL: string;
  API_CLIENT_ID: number;
  API_KEY: string;
};

export const setUpEnvironment = (): EnvironnementVariable => {
  const { BOT_TOKEN, BOT_GUILD, API_URL, API_CLIENT_ID, API_KEY, NODE_ENV } =
    process.env;

  if (NODE_ENV && NODE_ENV.trimEnd() === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  if (
    !BOT_TOKEN ||
    !BOT_GUILD ||
    !API_URL ||
    !API_CLIENT_ID ||
    !API_KEY ||
    !NODE_ENV
  ) {
    throw Error("Could not find envrionment variables");
  }

  return {
    NODE_ENV,
    BOT_TOKEN,
    BOT_GUILD,
    API_URL,
    API_CLIENT_ID: parseInt(API_CLIENT_ID),
    API_KEY,
  };
};
