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

// Port definition
const port = process.env.PORT || 1980;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
