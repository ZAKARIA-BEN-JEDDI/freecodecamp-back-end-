const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public directory
app.use(express.static('public'));

// Route for root path - serves index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for timestamp
app.get('/api/:date?', (req, res) => {
  let date;
  const dateParam = req.params.date;

  // If no date parameter is provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the date parameter is a Unix timestamp (number)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check if date is invalid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
    return;
  }

  // Return both Unix timestamp and UTC string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// 404 Error handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});