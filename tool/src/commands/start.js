import chalk from "chalk";

export const start = (config) => {
  console.log(chalk.bgCyanBright(" starting the app"));
  console.log(chalk.bgCyanBright("recieved configuration in start"));
};
