// import * as pkgUp from "pkg-up";
import chalk from "chalk";
import * as cosmiconfig from "cosmiconfig";
import Avj from "ajv";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const schema = require("./schema.json");

const avj = new Avj();

const configLoader = cosmiconfig.cosmiconfigSync("tool");

export const getConfig = () => {
  const result = configLoader.search(process.cwd());
  if (result) {
    const isValid = avj.validate(schema, result);
    console.log(isValid);
    if (!isValid) {
      console.log(chalk.yellow("Invalid configuration was supplied"));
      console.log(ajv.errors);
      process.exit(1);
    }
    console.log("found configuration", result.config);
    return result.config;
  } else {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  }
};
