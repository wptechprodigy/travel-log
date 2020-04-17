const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const middlewares = require('./middlewares');
const logsRoute = require('./api/logsRoute');

// Express app setup
const app = express();

// Setup database connection
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL, {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Let's be sure the database is connected.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('Database has been connected!');
});

// Middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// app.disable('x-powered-by');

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World!',
//   });
// });

app.use('/api/logs', logsRoute);

// If all routes are not found - error handler
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Port definition
const port = process.env.PORT || 1980;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
//
