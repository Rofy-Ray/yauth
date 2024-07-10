require('dotenv').config();
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID,
  keyFilename: 'keys/firestore.json',
});

module.exports.firestoreDB = firestore;

module.exports.createUserDoc = async (user) => {
  try {
    const userRef = firestore.collection('users').doc(user.id);
    await userRef.set(user);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getUserDoc = async (userId) => {
  try {
    const userRef = firestore.collection('users').doc(userId);
    const userDoc = await userRef.get();
    return userDoc.data();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updateUserDoc = async (userId, updates) => {
  try {
    const userRef = firestore.collection('users').doc(userId);
    await userRef.update(updates);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};