require('dotenv').config();
const Firestore = require('@google-cloud/firestore');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const projectID = process.env.PROJECT_ID;
const secretID = process.env.SECRET_ID;

const secretResourceName = `projects/${projectID}/secrets/${secretID}/versions/latest`;

async function getSecret() {
  const client = new SecretManagerServiceClient();
  const secret = await client.accessSecretVersion({
    name: secretResourceName
  });
  const firestoreKeys = JSON.parse(secret[0].payload.data);
  return firestoreKeys;
}

async function connectFirestore() {
  const firestoreKeys = await getSecret();
  const firestore = new Firestore({
    projectId: process.env.FIRESTORE_PROJECT_ID,
    keyFilename: firestoreKeys,
  });
  module.exports.firestoreDB = firestore;
}

connectFirestore();

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