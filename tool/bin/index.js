#!node

import arg from "arg";
import chalk from "chalk";
import { getConfig } from "../src/config/config-mgr.js";
import { start } from "../src/commands/start.js";
import { logger } from "../src/logger.js";

const log = logger("bin");
const usage = () => {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
};

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  log.debug("Received args", args);

  if (args["--start"]) {
    const config = getConfig();
    start(config);
  }
} catch (error) {
  log.warning(chalk.bgCyanBright(error.message));
  usage();
}
