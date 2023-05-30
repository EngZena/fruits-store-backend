const dotenv = require('dotenv');
const C = require('./utils/log');

/**
 * uncaughtException means no code was looking for that execption
 */
process.on('uncaughtException', (error) => {
  C(`uncaughtException 💥💥 ${error.name}: ${error.message}`);
});
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  C(`App running on port ${port}...`);
});

/**
 * unhandledrejection event is sent to the global scope of a script when a JavaScript Promise
 * that has no rejection handler is rejected
 */
process.on('unhandledRejection', (error) => {
  C(`unhandledRejection 💥💥 ${error.name}: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
