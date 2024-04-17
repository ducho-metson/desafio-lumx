// MongoDB Initializing Script 
// Create collections and insert initial data
const config = require('config');
const dbUrl = config.get('db.url');

const mongoose = require('mongoose');
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Collection Schema definition
const model = require("../api/database/model")

const users = [
    { name: 'Gabriel', email: 'gabriel@lumx.com' },
    { name: 'Bruno', email: 'bruno@lumx.com' },
];

const orders = [
    { _id: 0, owner: 'gabriel@lumx.com', type: "venda" },
    { _id: 1, owner: 'bruno@lumx.com', type: "compra" },
];

async function precisaInserir() {
    const users = model.User.find()
    return users.size() > 0
}

async function deletarTudo() {
    await model.User.deleteMany({});
    await model.Order.deleteMany({});
}

// Função para inserir dados na coleção
async function inserirUsuarios() {
    try {
        await model.User.insertMany(users);
        await model.Order.insertMany(orders);

        console.log(orders);

        console.log('Usuarios e Pedidos inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir:', error);
    } finally {
        mongoose.disconnect();
    }
}


try {
    if (precisaInserir()) {
        deletarTudo();
        inserirUsuarios();
    } else {
        mongoose.disconnect();
    }
} catch (error) {
    console.error('Erro ao inicializar database:', error);
}
