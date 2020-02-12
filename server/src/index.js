const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');

// Express app setup
const app = express();

// Setup database connection
mongoose.connect(process.env.DATABASE_URL, {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Let's be sure the database is connected.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Database has been connected!');
});

// Middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

// app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

// If all routes are not found - error handler
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Port definition
const port = process.env.PORT || 1980;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
