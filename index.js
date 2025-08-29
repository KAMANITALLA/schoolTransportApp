const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TransportApp',
  password: '123',
  port: 5432,
});

app.get('/api/arrets', async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT 
          a."idarret",
          a."intitule",
          p."latposition"::float AS "latposition",
          p."longposition"::float AS "longposition"
        FROM "SchemaApp"."Arret" a
        JOIN "SchemaApp"."Position" p ON a."idposition" = p."idposition";
      `);      
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des arrêts:', error);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(PORT, () => {
  console.log(`✅ API en cours d'exécution sur http://localhost:${PORT}`);
});
