const { db } = require('./firebase_init');
const {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc
} = require('firebase-admin/firestore');

class FirestoreService {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async getAllDocuments() {
    const snapshot = await getDocs(this.collectionRef);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  async getDocumentById(id) {
    const docRef = doc(this.collectionRef, id);
    const snapshot = await getDoc(docRef);
  
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null; 
    }
  }

  async PostDocument(customId, dataObject) {
    try {
      console.log(customId, dataObject);
      const docRef = doc(this.collectionRef, customId.toString());
      await setDoc(docRef, dataObject);
      console.log("Documento creado con ID:", customId);
    } catch (e) {
      console.error("Error al crear el documento:", e);
    }
  }
  
}

module.exports = FirestoreService;