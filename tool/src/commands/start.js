import chalk from "chalk";
import { logger } from "../logger.js";

const log = logger("commands:start");

export const start = (config) => {
  log.highlight("Starting the app");
  log.debug("Recieved configuration", config.port);
};
