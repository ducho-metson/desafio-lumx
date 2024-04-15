const app = require('express')();
const port = process.env.PORT || 8080;

const routes = require('./api/routes');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});