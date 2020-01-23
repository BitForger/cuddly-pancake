FROM node:latest
WORKDIR /home/node/app
COPY package* ./
COPY tsconfig* ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","run","start:prod"]
