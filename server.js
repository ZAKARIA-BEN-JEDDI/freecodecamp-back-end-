const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur le Timestamp Microservice');
});

// Route principale pour traiter la date
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  if (!date) {
    date = new Date();
  } else {
    if (!isNaN(date)) {
      date = parseInt(date);
    }
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
