FROM node:16.17.0-alpine3.15
WORKDIR /app
COPY ./package.json ./
RUN yarn install 
COPY . .
RUN npm run build
CMD ["yarn", "run", "start"]
