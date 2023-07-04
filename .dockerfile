FROM node:18.16.0

WORKDIR /api

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]