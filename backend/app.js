const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./utils/cors');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/arounddb');
const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const homePageRouter = require('./routes/app');
const { signup, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: allowedCors, methods: DEFAULT_ALLOWED_METHODS }));
app.post('/signin', login);
app.post('/signup', signup);

app.use(auth);

app.use('/', auth, userRouter);
app.use('/', auth, cardsRouter);
app.use('/', homePageRouter);
app.listen(PORT);
