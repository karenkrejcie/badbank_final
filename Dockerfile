FROM node:slim

MAINTAINER karen.krejcie <karen.krejcie@nwtc.edu>

WORKDIR /app

#copies package.json and package-lock.json into working direction
COPY package*.json ./

#install npm packages
RUN npm install

#copies the rest of your app's src files into the working directory
COPY . .