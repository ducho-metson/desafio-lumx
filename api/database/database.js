const acess = require('mongoose');

async function initializeDatabase(mongoURI) {
    acess.connect(mongoURI)
        .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso em: ', mongoURI))
        .catch(err => console.error('Erro ao conectar com o MongoDB:', err));
}


module.exports = {
    acess,
    initializeDatabase,
};
