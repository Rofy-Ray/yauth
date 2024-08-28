require('dotenv').config();
const express = require('express');
const workos = require('../services/workos');
const jose = require('jose');
// const firestore = require('../services/firestore');


const authRouter = express.Router();
const { createUser, updateUser, deleteUser, listUsers, sendVerificationEmail, verifyEmail, authenticateUser, signOut } = workos;
// const { createUserDoc } = firestore;

authRouter.use(express.json());

authRouter.post('/signup', async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	
	try {
	  const users = await listUsers(email);
	  
	  if (users.length > 0) { 
		const user = users[0];
		
		if (user.emailVerified) {
		  return res.send({ message: 'User already exists and is verified' });
		} else {
			await sendVerificationEmail(user.id);
		  	return res.send({ message: 'Verification email sent' });
		}
	  }
	  
	  const newUser = await createUser(email, password, firstName, lastName);
	  await sendVerificationEmail(newUser.id);
	  return res.send({ message: 'New user created and verification email sent', user: newUser });
	} catch (error) {
		console.error('Error during signup:', error);
  		res.status(500).send(error.message);
	}
});

authRouter.put('/update', async (req, res) => {
    const { userId, ...updateData } = req.body;
    try {
        const updatedUser = await updateUser(userId, updateData);
        res.send({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).send(error.message);
    }
});

authRouter.delete('/delete', async (req, res) => {
    const { userId } = req.body;
    try {
        await deleteUser(userId);
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).send(error.message);
    }
});

authRouter.post('/verify', async (req, res) => {
	const { id, code } = req.body;
	try {
		const user = await verifyEmail(id, code);
		res.send({ message: 'User email has been verified', user: user });
	} catch (error) {
		console.error('Error during verification:', error);
		res.status(400).send(error.message);
	}
});

authRouter.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	const clientId = process.env.WORKOS_CLIENT_ID
	try {
		const user = await authenticateUser(clientId, email, password);
		res.send(user);
	} catch (error) {
		console.error('Error during signin:', error);
		res.status(401).send(error.message);
	}
});

authRouter.post('/signout', async (req, res) => {
	const { accessToken } = req.body;
	const sessionId = jose.decodeJwt(accessToken).sid;
	try {
	  const logoutUrl = await signOut(sessionId);
		res.redirect(logoutUrl);
	} catch (error) {
	  console.error('Error during signout:', error);
	  res.status(401).send(error.message);
	}
});

module.exports = authRouter;