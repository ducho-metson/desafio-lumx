.PHONY: build up down

# Comando padrão quando apenas 'make' é executado
default: up

# Comando para construir as imagens e iniciar os contêineres
up:
    docker-compose up --build -d

# Comando para parar e remover os contêineres
down:
    docker-compose down

# Comando para construir as imagens sem iniciar os contêineres
build:
    docker-compose build