const express = require('express');
const firestore = require('../services/firestore');
const workos = require('../services/workos');

const usersRouter = express.Router();
const { getUserDoc, updateUserDoc } = firestore;

usersRouter.get('/:userId', async (req, res) => {
  try {
    const user = await getUserDoc(req.params.userId);
    res.send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

usersRouter.patch('/:userId', async (req, res) => {
  try {
    const updates = req.body;
    await updateUserDoc(req.params.userId, updates);
    res.send(updates);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = usersRouter;