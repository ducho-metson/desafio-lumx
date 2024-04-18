# LUMX Challenge

## Descrição 

Esse projeto consiste em uma API responsável gestão de Usuários e Pedidos em um banco de dados MongoDB, proporcionando um CRUD para gestão dessas informações. Além disso, também é responsável pelo envio de eventos, utilizando RabbitMQ como intermediário, para comunicar atualizações de pedidos para usuários responsáveis. 

A lógica de envio de notificação não foi enviada, porém a estrutura de mensageria baseada nas atualizações e reenfileiramento de evento em caso falha ao notificar já está desenvolvido.

## Usuários
- [Documentação da API de Usuários](./doc/users.swagger.yaml)

* name: nome do usuário.
* email: email do usuário e identificador único para o mesmo. 


### Pedido
- [Documentação da API de Pedidos](./doc/order.swagger.yaml)

* id: identificador único para pedido.
* owner: email de usuário responsável pelo pedido.
* type: status referente ao pedido.