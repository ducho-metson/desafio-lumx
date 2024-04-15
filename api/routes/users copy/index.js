const users = require('express').Router();
const usersData = require('../../data/user/user.js')

users.get('/', (req, res) => {
    console.log(`recebida requisicao em users`)

    res.status(200).json(usersData.getAll());
});

module.exports = users;