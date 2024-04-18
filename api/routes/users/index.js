const errors = require("../../utils/errors")

const express = require('express')
const users = express.Router();
const usersController = require('../../controllers/users/users')

users.use(express.json());

users.get('/', async (req, res) => {
    try {
        const userList = await usersController.getAll()
        res.status(200).json(userList);
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

users.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const userList = await usersController.get(email);
        res.status(200).json(userList);
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

users.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        await usersController.add(name, email);
        res.status(200).json('Usuario adicionado com sucesso');
    } catch (err) {
        if (err == errors.invalidParameters) {
            res.status(400).json({ error: "Parametros inválidos" });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Erro adicionando Usuário:' });
        }
    }
});

users.delete('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        await usersController.remove(email);
        res.status(200).json('Usuario removido com sucesso');
    } catch (err) {
        if (err == errors.invalidParameters) {
            res.status(400).json({ error: "Parametros inválidos" });
        } else if (err == errors.notFound) {
            res.status(400).json({ error: "Usuário a ser removido não existe" });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Erro removendo usuário:' });
        }
    }
});

users.put('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        await usersController.update(name, email);
        res.status(200).json('Usuario atualizado com sucesso');
    } catch (err) {
        if (err == errors.invalidParameters) {
            res.status(400).json({ error: "Parametros inválidos" });
        } else if (err == errors.notFound) {
            res.status(400).json({ error: "Usuário a ser atualizado não existe" });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Erro atualizando usuário:' });
        }
    }
});

module.exports = users;