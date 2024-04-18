const config = require('config');
const dbUrl = config.get('db.url');

const mongoose = require('mongoose');

const model = require("../api/database/model")

const users = [
    { name: 'Gabriel', email: 'gabriel@lumx.com' },
    { name: 'Bruno', email: 'bruno@lumx.com' },
];

const orders = [
    { _id: 0, owner: 'gabriel@lumx.com', type: "venda" },
    { _id: 1, owner: 'bruno@lumx.com', type: "compra" },
];

async function precisaInserir(connect) {
    const userCount = await mongoose.connection.db.collection("users").count()
    return userCount === 0;
}

async function deletarTudo() {
    await model.User.deleteMany({});
    await model.Order.deleteMany({});
}

async function inserirUsuarios() {
    try {
        await model.User.insertMany(users);
        await model.Order.insertMany(orders);

        console.log('Usuarios e Pedidos inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir:', error);
    } finally {
        mongoose.disconnect();
    }
}

async function preencheDatabase() {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        const precisoInserir = await precisaInserir()
        if (precisoInserir) {
            console.log('Nenhum dado de entrada encontrado, executando preenchimento de dados para validação')
            inserirUsuarios();
        } else {
            mongoose.disconnect();
        }
    } catch (error) {
        console.error('Erro ao inicializar database:', error);
    }
}

preencheDatabase()
