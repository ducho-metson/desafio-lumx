const config = require('config');


const port = config.get('server.port');
const app = require('express')();
const routes = require('./api/routes');

const dbUrl = config.get('db.url');
const database = require('./api/database/database')

database.initializeDatabase(dbUrl)

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

