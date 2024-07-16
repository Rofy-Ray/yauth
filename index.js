const express = require('express');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const functions = require('@google-cloud/functions-framework');
const appFunction = require('./function.js'); 

const app = express();

app.use('/auth', authRouter);
app.use('/users', usersRouter);

functions.http('yauth', (req, res) => {
  appFunction(app)(req, res);
});