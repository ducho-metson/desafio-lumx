const acess = require('mongoose');

async function initializeDatabase(mongoURI) {
    acess.connect(mongoURI)
        .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso em: ', mongoURI))
        .catch(err => console.error('Erro ao conectar com o MongoDB:', err));

    const model = require("./model");

    const users = await model.User.find();

    console.log(users);
}


module.exports = {
    acess,
    initializeDatabase,
};


