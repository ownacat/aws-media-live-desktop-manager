import chalk from 'chalk';
import detectPort from 'detect-port';

const port: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : null || 1212;

detectPort(port, (err: Error, availablePort: number) => {
  if (port !== availablePort) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`
      )
    );
  } else {
    process.exit(0);
  }
});
