import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FirestoreService } from './nosql/firestore_service.js';
import SqlConnection from './SQL/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const imagesService = new FirestoreService("LoginApp");

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// POST /upload — subir imagen y guardar nombre en Firestore
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  try {
    await imagesService.PostDocument(req.file.filename, {
      filename: req.file.filename,
      uploadedAt: new Date().toISOString()
    });
    res.send(`Image uploaded: ${req.file.filename}`);
  } catch (error) {
    console.error("Firestore error:", error);
    res.status(500).send('Error saving image info.');
  }
});

// POST /register — insertar usuario en base de datos SQL
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Missing fields.");

  const db = new SqlConnection();

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

// GET /user/:username — consultar usuario en base de datos SQL
app.get('/user/:username', async (req, res) => {
  const db = new SqlConnection();
  try {
    await db.connectToDb();
    const result = await db.query(
      "SELECT * FROM user WHERE iduser = ?",
      [req.params.username]
    );
    await db.closeConnection();

    if (result.length === 0) {
      res.status(404).send("User not found.");
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error retrieving user.");
  }
});

app.post('/uploadsql', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Missing fields.");

  
  const data = {
    username: username,
    password: password
  }

  try {
    const db = new FirestoreService("Users");
    await db.PostDocument(username, data);
    res.status(200).send("User registered.");
  } catch (err) {
    console.error("noSQL error:", err);-
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});