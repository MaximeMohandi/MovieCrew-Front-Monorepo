import configProd from "./config";
import configDev from "./config.dev";
import configTest from "./config.test";

interface Config {
  baseUrl: string;
}

function getConfig(): Config {
  if (!process.env.NODE_ENV) throw new Error("NODE_ENV not set");
  const env = process.env.NODE_ENV.trimEnd().toLowerCase();

  if (env === "test") return configTest;

  if (env === "development") return configDev;

  return configProd;
}

export default getConfig();
