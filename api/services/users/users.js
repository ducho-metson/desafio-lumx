const errors = require("../../utils/errors")
const usersData = require('../../database/data/user/user')

async function getAll() {
    return await usersData.getAll();
}

async function get(email) {
    return await usersData.get(email);
}

async function add(name, email) {
    if (!name || !email) {
        throw errors.invalidParameters
    }

    return await usersData.add(name, email);
}

async function remove(email) {
    return await usersData.remove(email);
}

async function update(name, email) {
    if (!name || !email) {
        throw errors.invalidParameters
    }

    return await usersData.update(name, email);
}

module.exports = {
    getAll,
    get,
    add,
    remove,
    update
}