const express = require('express');
const FirestoreService = require('./nosql/firestore_service');
const FirestoreQuery = require('./nosql/firestore_query');
const SqlService = require('./sql/connection');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('views'));

/** SQL: Ejemplo de inserción **/
app.post('/example/sql', async (req, res) => {
  const { username, password } = req.body;

  const db = new SqlService();
  try {
    await db.connectToDb();
    await db.query(
      "INSERT INTO user (iduser, password) VALUES (?, ?)",
      [username, password]
    );
    res.status(200).send("User registered.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});

/** Firestore: Insertar documento con ID personalizado **/
app.post('/example/firestore', async (req, res) => {
  const { id, ...data } = req.body;
  const firestore = new FirestoreService('users');

  try {
    await firestore.postDocument(id, data);
    res.status(200).send("Document added to Firestore.");
  } catch (err) {
    console.error("Firestore error:", err);
    res.status(500).send("Error adding document.");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});