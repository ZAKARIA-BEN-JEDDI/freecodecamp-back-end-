const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;
  let date;
  
  // Handle empty date parameter - return current date
  if (!dateInput) {
    date = new Date();
  } else {
    // Check if dateInput is a number (Unix timestamp)
    if (!isNaN(dateInput)) {
      dateInput = parseInt(dateInput);
    }
    date = new Date(dateInput);
  }
  
  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }
  
  // Return the JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
