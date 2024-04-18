const ordersData = require('../../database/data/order/order')
const errors = require('../../utils/errors')
const notifier = require('../../externalservices/notifier/notifier')

async function getAll() {
    return await ordersData.getAll();
}

async function get(orderId) {
    return await ordersData.get(orderId);
}

async function add(ownerEmail, type) {
    if (!ownerEmail || !type) {
        throw errors.invalidParameters
    }

    return await ordersData.add(ownerEmail, type);
}

async function remove(orderId) {
    if (!orderId) {
        throw errors.invalidParameters
    }

    return await ordersData.remove(orderId);
}

async function update(id, owner, type) {
    if (!id || !owner || !type) {
        throw new Error('Atualização de pedido precisa de id do pedido, email do owner e tipo do pedido!');
    }

    await ordersData.update(id, owner, type);

    const message = {
        order: {
            id: id,
            email: owner,
            type: type
        },
        time: Date.now()
    };

    await notifier.notify(JSON.stringify(message)).catch(console.error);
}

module.exports = {
    getAll,
    get,
    add,
    remove,
    update
}