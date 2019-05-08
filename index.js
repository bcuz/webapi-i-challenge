const express = require('express');

const db = require('./data/db');

const server = express();
// const { hubs } = db;

server.use(express.json());

server.get('/', (req,res) => {

    res.send("<h2>Hello World</h2>")
})

server.listen(5001, () => {
  console.log('Server is listening');
})