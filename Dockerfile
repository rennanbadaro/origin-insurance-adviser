FROM node:14.15.3-alpine

WORKDIR /app
RUN mkdir -p /app/node_modules /app/src && chown -R node:node /app

USER node

COPY package*.json ./
COPY src ./src

RUN npm i --production

ENV PORT=3000
ENV NODE_PATH=.

EXPOSE 3000
CMD ["npm", "start"]
