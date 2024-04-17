const usersData = require('../../data/user/user')

async function getAll() {
    return await usersData.getAll();
}

async function get(name) {
    return await usersData.get(name);
}

async function add(name, email) {
    if (!name || !email) {
        throw new Error('Usuário precisa de nome e email!');
    }

    return await usersData.add(name, email);
}

async function remove(name) {
    return await usersData.remove(name);
}

async function update(name, email) {
    if (!name || !email) {
        throw new Error('Usuário precisa de nome e email!');
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