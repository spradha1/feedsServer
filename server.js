const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// cors policy
app.use(cors({
  origin: "*",
}));
// Server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/feeds_reader/*', async (req, res) => {
  try {
    const response = await fetch(req.params[0]);
    const text = await response.text();
    res.send(text);
  }
  catch (e) {
    console.log("Error fetching RSS feed: " + e.message);
  };
});