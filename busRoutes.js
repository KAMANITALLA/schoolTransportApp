const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Remplace les valeurs ci-dessous par les tiennes
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TransportApp',
  password: '123',
  port: 5432,
});

app.get('/api/bus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Bus');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur récupération bus :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(port, () => {
  console.log(`API en écoute sur http://localhost:${port}`);
});
