const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`Express is running on port: ${port}`)
})

const port = process.env.PORT || 1980;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
