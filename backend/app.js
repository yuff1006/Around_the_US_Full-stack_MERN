const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();
const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./utils/cors');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/arounddb');
const { PORT = 3000 } = process.env;

const errorHandling = require('./middlewares/errorHandling');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const homePageRouter = require('./routes/app');
const { signup, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateCredentials } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: allowedCors, methods: DEFAULT_ALLOWED_METHODS }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.post('/signup', validateCredentials, signup);
app.post('/signin', validateCredentials, login);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardsRouter);
app.use('/', homePageRouter);
app.use(errorLogger);

app.use(errors());
app.use(errorHandling);
app.listen(PORT);
