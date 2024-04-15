const orders = require('express').Router();
const ordersData = require('../../data/order/order')

orders.get('/', (req, res) => {
    console.log(`recebida requisicao em orders`)

    res.status(200).json(ordersData.getAll());
});

module.exports = orders;