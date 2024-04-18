const errors = require("../../utils/errors")
const express = require('express')
const orders = express.Router();
const ordersController = require('../../services/orders/orders')

orders.use(express.json());

orders.get('/', async (req, res) => {
    try {
        const ordersList = await ordersController.getAll()
        res.status(200).json(ordersList);
    } catch (err) {
        if (err == errors.notFound) {
            res.status(200).json({
                error: "Não encontrado"
            });
        } else {
            console.error(err);
            res.status(500).json({
                error: "Erro durante a busca",
            });
        }
    }
});

orders.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "Erro: GET precisa ter um id na URL" });
        }

        const orderFound = await ordersController.get(id);
        res.status(200).json(orderFound);
    } catch (err) {
        if (err == errors.notFound) {
            res.status(200).json({
                error: "Não encontrado"
            });
        } else {
            console.error(err);
            res.status(500).json({
                error: "Erro durante a busca",
            });
        }
    }
});

orders.post('/', async (req, res) => {
    try {
        const { owner, type } = req.body;
        const idOrder = await ordersController.add(owner, type);
        const msg = 'Pedido adicionado com sucesso. id de pedido: ' + idOrder;
        res.status(200).json(msg);
    } catch (err) {
        if (err == errors.invalidParameters) {
            res.status(400).json({ error: "Parametros inválidos" });
        } else if (err == errors.notFound) {
            res.status(400).json({ error: "Owner inserido não existe" });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Erro adicionando Pedido:' });
        }
    }
});

orders.delete('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        await ordersController.remove(name);
        res.status(200).json('Pedido removido com sucesso');
    } catch (err) {
        if (err == errors.invalidParameters) {
            res.status(400).json({ error: "Parametros inválidos" });
        } else if (err == errors.notFound) {
            res.status(400).json({ error: "Pedido a ser removido não existe" });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Erro removendo Pedido:' });
        }
    }
});

orders.put('/', async (req, res) => {
    try {
        const { id, owner, type } = req.body;
        await ordersController.update(id, owner, type);
        res.status(200).json('Pedido atualizado com sucesso');
    } catch (err) {
        if (err == errors.invalidParameters) {
            res.status(400).json({ error: "Parametros inválidos" });
        } else if (err == errors.notFound) {
            res.status(400).json({ error: "Pedido não existe ou Email não está atrelado à um Usuário" });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Erro atualizando Pedido' });
        }
    }
});

module.exports = orders;