FROM mhart/alpine-node:16.4.2
WORKDIR /app
COPY ./package.json ./
RUN yarn install 
COPY . .
RUN npm run build
CMD ["yarn", "run", "start:develop"]
