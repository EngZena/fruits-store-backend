const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();

/**
 * helmet helps secure Node.js applications by setting several HTTP headers.
 * It acts as middleware for Express.
 */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
    },
  })
);

/**
 * morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
 * rateLimit a technique used to control the amount of incoming or outgoing traffic within a network.
 */
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many request from this IP please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/**
 * xss is a module used to filter input from users to prevent XSS attacks
 */
app.use(xss());

module.exports = app;
