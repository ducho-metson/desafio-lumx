# Lumx Challenge - Felipe Metson

## Descrição 

Esse projeto consiste em uma API responsável gestão de Usuários e Pedidos em um banco de dados MongoDB, proporcionando um CRUD para gestão dessas informações. Além disso, também é responsável pelo envio de eventos, utilizando RabbitMQ como intermediário, para uma função lamba cujo objetivo é comunicar atualizações de pedidos para usuários responsáveis.

A função lambda nesse projeto é um consumer e a comunicação, como explicado anteriomente, entre ele e a API é numa relação de consumer/publisher. A lógica de envio de notificação não foi enviada, porém a estrutura de mensageria baseada nas atualizações e reenfileiramento de evento em caso falha ao notificar já está desenvolvido.

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
3. Rode e builde a aplicação, se estiver o makefile garante a execução com um _make_
```bash
   docker-compose up --build
```

4. Agora a aplicação está acessável pela url http://localhost:3000

Obs: O script _/scripts/dbinitializer.js_ foi utilizado para preencher o banco de dados com os seguintes usuários e pedidos:

```js
const users = [
    { name: 'Gabriel', email: 'gabriel@lumx.com' },
    { name: 'Bruno', email: 'bruno@lumx.com' },
];

const orders = [
    { _id: 0, owner: 'gabriel@lumx.com', type: "venda" },
    { _id: 1, owner: 'bruno@lumx.com', type: "compra" },
];
```

## Usuários

* name: nome do usuário.
* email: email do usuário e identificador único para o mesmo. 

[Documentação da API de Usuários](./doc/user.swagger.yaml)

### Pedido

* id: identificador único para pedido.
* owner: email de usuário responsável pelo pedido.
* type: status referente ao pedido.

[Documentação da API de Pedidos](./doc/order.swagger.yaml)


## Infraestrutura

#### Virtualização

Todas as infraestruturas e aplicações executadas por essa aplicação estão dockerizadas com o objetivo de estabelecer uma configuração de comunicação entre elas e possibilitar que o ambiente seja levantado facilmente.

#### Persistência de Dados

Para a persistência de dados dessa aplicação, foi utilizado o MongoDB. O acesso à esse MongoDB é realizado apenas pela API CRUD.


#### Eventos

Para a gestão de eventos e comunicação da API(publisher) com a função lambda(consumer), foi utilizado o RabbitMQ. Esse por sua vez, garante que comunicação baseada em eventos entre as aplicações ddesse projeto, persistindo eventos na fila e refileirando-os caso necessário.

## Melhorias 

A falta de conhecimento em NodeJs e o tempo curto do desafio(so consegui começa-lo de fato na terça-feira.) me dificultaram para efetuar uma entrega de qualidade. Apesar de funcional, consegui identificar diversos pontos de melhora e farei essa sessão para apontar e justifica-los, uma vez que não haverá tempo de implementar.


#### Engenharia de Software

Aplicação poderia ter sido implementada com tipos para permitir injeção de dependência. Melhoraria a garantia de coesão dos modulos implementados, além de melhorar desempenho uma vez que reinstancio conexões com rabbit sempre que envio um evento. 

Documentação poderia ser feita melhor, em especial a documentação do consumer e da função lambda.

#### Testes de Integração e Unitários

Testes de integração estavam em meu radar desde o início dessa tarefa, todavia, pela falta de tempo e pelo ferramentas a serem integradas nos testes como MongoDB e RabbitMQ o tempo a ser gasto foi preferido em outras etapas. A implementação do teste facilitaria o desenvolvimento, inclusive numa possível extensão dessa aplicação incluindo mais regras de negócio.

#### Segurança

A aplicação implementada não garante segurança alguma. Não existe validação de quem está fazendo as requisições, e portanto, não existe uma proteção contra ataques de sobrecarga e também não existe proteção contra os dados do servidor, uma vez que não existe permissionamento para o cliente.

Uma solução para esse problema seria a implementação de endpoints de autentição para garantir que o cliente tem permissão de alteração nos dados em questão. Além de ter a capacidade de bloquear ataques provenientes desse mesmo cliente.