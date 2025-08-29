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
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des arrêts');
    }
  });
  