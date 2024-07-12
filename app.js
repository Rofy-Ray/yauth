const express = require('express');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const functions = require('@google-cloud/functions-framework');

const app = express();

app.use('/auth', authRouter);
app.use('/users', usersRouter);

functions.http('yauth', (req, res) => {
  app(req, res);
});

// exports.yauth = app;

// app.listen(3000, () => {
//   console.log('yAuth Microservice is listening on port 3000');
// });

// exports.handler = app;
// module.exports = { app };