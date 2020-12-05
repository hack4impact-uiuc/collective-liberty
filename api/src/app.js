const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

dotenv.config();

// run passport setup
require('./middleware/passport');

const app = express();

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log('Connected to MongoDB instance.'),
    (error) => console.log('Could not connect to MongoDB instance: ', error)
  );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({ credentials: true, origin: process.env.TEST_CLIENT_HOST || true })
);
app.use(helmet());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {},
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

module.exports = app;
