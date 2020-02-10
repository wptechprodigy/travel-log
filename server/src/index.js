const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Express app setup
const app = express();

// Middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

// If all routes are not found - error handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })
})

// Port definition
const port = process.env.PORT || 1980;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
