const express = require('express')
const users = express.Router();
const usersController = require('../../controllers/users/users')

users.use(express.json());

users.get('/', async (req, res) => {
    try {
        const userList = await usersController.getAll()
        res.status(200).json(userList);
    } catch (err) {
        errText = 'Erro ao buscar usuários:'
        console.error(errText, err);
        res.status(500).json({ error: errText });
    }
});

users.get('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const userList = await usersController.get(name);
        res.status(200).json(userList);
    } catch (err) {
        errText = 'Erro ao buscar usuário:'
        console.error(errText, err);
        res.status(500).json({ error: errText });
    }
});

users.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        await usersController.add(name, email);
        res.status(200).json('Usuario adicionado com sucesso');
    } catch (err) {
        errText = 'Erro adicionando usuário:';
        console.error(errText, err);
        res.status(500).json({ error: errText });
    }
});

users.delete('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        await usersController.remove(name);
        res.status(200).json('Usuario removido com sucesso');
    } catch (err) {
        errText = 'Erro ao remover usuário:';
        console.error(errText, err);
        res.status(500).json({ error: errText });
    }
});

users.put('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        await usersController.update(name, email);
        res.status(200).json('Usuario atualizado com sucesso');
    } catch (err) {
        errText = 'Erro atualizando usuário:';
        console.error(errText, err);
        res.status(500).json({ error: errText });
    }
});

module.exports = users;