const express = require('express');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');

const routes = express.Router();

const users = require('./users');
const video = require('./video');
const subscribe = require('./subscribe');
const comment = require('./comment');

// Set static files
routes.use(express.static(path.join(__dirname, '../../public')));

// Passport Middleware
routes.use(passport.initialize());
routes.use(passport.session());
require('../policies/passport')(passport);

// bodyParser Middleware
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));
routes.use(morgan('dev'));
routes.use('/users', users);
routes.use('/video', video);
routes.use('/subscription', subscribe);
routes.use('/comment', comment);

routes.use('/uploads', express.static('uploads/'));
routes.get('/status/health', (req, res) => {
  res.send('GOOD');
});

// If the app uses the Angular router, you must configure
// the server to return the application's host page (index.html)
// when asked for a file that it does not have.
routes.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../../public') });
});

// should never get here
routes.use((req, res) => {
  res.status(404).end('404 not found');
});

// routes.use((error, req, res, next) => {
//   res.status(error.statusCode || 500).json({ error: error.message });
// });

module.exports = routes;
