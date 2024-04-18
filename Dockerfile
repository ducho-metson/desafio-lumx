# Use uma imagem Node.js e Python como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho no contêiner
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install && npm install mongoose && npm install amqp-connection-manager

# Copie o restante dos arquivos para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta em que a API irá rodar
EXPOSE 3000

# Comando para iniciar o ambiente
CMD ["./init.sh"]