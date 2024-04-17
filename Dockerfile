# Use uma imagem Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho no contêiner
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install && npm install mongoose

# Copie o restante dos arquivos para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta em que a API irá rodar
EXPOSE 3000

# Comando para iniciar o servidor da API
CMD ["./init.sh"]