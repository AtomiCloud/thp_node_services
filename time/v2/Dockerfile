FROM node:latest
RUN apt update -y
RUN apt install nano -y
COPY package.json package.json
RUN npm i
RUN npm i -g ts-node
COPY . .
ENTRYPOINT [ "ts-node", "main" ]
