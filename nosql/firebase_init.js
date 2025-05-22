const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBgoWaCd6APngiq3Jv-d4abmByqZyFxJ8",
  authDomain: "db-multimedia.firebaseapp.com",
  projectId: "db-multimedia",
  storageBucket: "db-multimedia.firebasestorage.app",
  messagingSenderId: "703694156223",
  appId: "1:703694156223:web:cd702f775e4417841db10a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };