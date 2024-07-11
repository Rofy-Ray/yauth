const express = require('express');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use('/auth', authRouter);
app.use('/users', usersRouter);

// const yauth = (req, res) => {
//   app(req, res);
// };

exports.yauth = app;

// app.listen(3000, () => {
//   console.log('yAuth Microservice is listening on port 3000');
// });

// exports.handler = app;
// module.exports = { app };