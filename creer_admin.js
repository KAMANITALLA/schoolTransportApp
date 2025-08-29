const bcrypt = require('bcrypt');
const { Client } = require('pg');

// Configuration PostgreSQL
const client = new Client({
  user: 'postgres',           // 🔁 ton utilisateur PostgreSQL
  password: '123', // 🔁 ton mot de passe PostgreSQL
  host: 'localhost',
  port: 5432,
  database: 'TransportApp',//ton nom de base
});

const creerAdministrateur = async () => {
  try {
    await client.connect();

    // 1. Génération du mot de passe aléatoire
    const motDePasse = Math.random().toString(36).slice(-8); // ex: "k2ld7u9a"
    const hash = await bcrypt.hash(motDePasse, 10);
    console.log('🔐 Mot de passe généré (à communiquer) :', motDePasse);

    // 2. Insertion dans la table Utilisateur
    const insertUtilisateur = `
      INSERT INTO "SchemaApp"."Utilisateur" 
      (nom, prenom, numTel, sexe, mail, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const utilisateurValues = [
      'Admin',                        // nom
      'Système',                     // prenom
      621238986,           // numTel
      'Homme',                       // sexe
      'ktrjkari@gmail.com',       // mail
      hash                           // mot de passe haché
    ];

    const result = await client.query(insertUtilisateur, utilisateurValues);
    const idUtilisateur = result.rows[0].id;

    // 3. Insertion dans la table Administrateur
    await client.query(
      `INSERT INTO "SchemaApp"."Administrateur" (id) VALUES ($1)`,
      [idUtilisateur]
    );

    console.log(`✅ Administrateur créé avec succès. ID: ${idUtilisateur}`);
  } catch (error) {
    console.error('❌ Erreur lors de la création :', error);
  } finally {
    await client.end();
  }
};

creerAdministrateur();
