const routes = require('express').Router();
const users = require('./users');
const orders = require('./orders');


routes.use('/users', users);
routes.use('/orders', orders);


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;