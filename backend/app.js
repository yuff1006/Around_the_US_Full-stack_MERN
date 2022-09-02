const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/arounddb');
const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const homePageRouter = require('./routes/app');
const { createNewUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62c49623430d2f6c5b2da7c3',
  };
  next();
});
app.post('/signin', login);
app.post('/signup', createNewUser);

app.use(auth);

app.use('/', homePageRouter);
app.use('/', userRouter);
app.use('/', cardsRouter);
app.listen(PORT);
