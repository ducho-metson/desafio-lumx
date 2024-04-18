# LUMX Challenge

## Descrição 

Esse projeto consiste em uma API responsável gestão de Usuários e Pedidos em um banco de dados MongoDB, proporcionando um CRUD para gestão dessas informações. Além disso, também é responsável pelo envio de eventos, utilizando RabbitMQ como intermediário, para comunicar atualizações de pedidos para usuários responsáveis. 

A lógica de envio de notificação não foi enviada, porém a estrutura de mensageria baseada nas atualizações e reenfileiramento de evento em caso falha ao notificar já está desenvolvido.

## Requisitos

Para utilizar esta aplicação, é necessário ter o Docker instalado na sua máquina.

## Instalação e Execução

1. Clone o repositório:
```bash
 git clone https://github.com/ducho-metson/desafio-lumx.git
```
2. Vá para o diretório da aplicação:
```bash
   cd desafio-lumx
```
3. Rode e builde a aplicação
```bash
   docker-compose up --build
```

4. Agora a aplicação está acessável pela url http://localhost:3000
   
## Usuários
- [Documentação da API de Usuários](./doc/user.swagger.yaml)

* name: nome do usuário.
* email: email do usuário e identificador único para o mesmo. 


### Pedido
- [Documentação da API de Pedidos](./doc/order.swagger.yaml)

* id: identificador único para pedido.
* owner: email de usuário responsável pelo pedido.
* type: status referente ao pedido.