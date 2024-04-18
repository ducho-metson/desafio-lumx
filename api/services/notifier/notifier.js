const { connect } = require('amqp-connection-manager');
const config = require('config');

const exchange = config.get('rabbit.orders-exchange')
const queue = config.get('rabbit.order-changed-queue')
const url = config.get('rabbit.url')

async function notify(message) {
    const connection = connect([url]);
    connection.on('connect', () => console.log('Conexão com o RabbitMQ estabelecida.'));
    connection.on('disconnect', (err) => console.error('Desconectado do RabbitMQ:', err));


    const channelWrapper = connection.createChannel({
        json: true,
        setup: (channel) => {
            return channel.assertExchange(exchange, 'direct', { durable: true });
        }
    });

    await channelWrapper.sendToQueue(queue, { message });

    console.log(`Mensagem '${message}' enviada para fila '${queue}'.`);

    await connection.close();
}

module.exports = {
    notify
};