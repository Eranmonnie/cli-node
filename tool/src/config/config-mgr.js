// import * as pkgUp from "pkg-up";
import chalk from "chalk";
import * as cosmiconfig from "cosmiconfig";
import Avj from "ajv";
import betterAvjErrors from "better-ajv-errors";
import { logger } from "../logger.js";

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const schema = require("./schema.json");

const avj = new Avj({ allErrors: true });

const configLoader = cosmiconfig.cosmiconfigSync("tool");

const log = logger("config:mgr");

export const getConfig = () => {

  const result = configLoader.search(process.cwd());

  if (result) {
    const isValid = avj.validate(schema, result.config);

    if (!isValid) {
      log.warning(chalk.yellow("Invalid configuration was supplied \n"));
      console.log(betterAvjErrors(schema, result.config, avj.errors));
      process.exit(1);
    }

    log.debug("Found configuration", result.config);
    return result.config;

  } else {

    log.warning("Could not find configuration, using default");
    return { port: 1234 };
    
  }
};
