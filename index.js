const express = require('express');

const db = require('./data/db');

const server = express();
// const { hubs } = db;

server.use(express.json());

server.get('/', (req,res) => {

    res.send("<h2>Hello World</h2>")
})

server.get('/api/users', (req,res) => {
  db.find()
  .then(users =>{
     res.json(users);
  })
  .catch(() => {    
      res.status(500).json({ error: "The users information could not be retrieved." })
  })
})

server.get('/api/users/:id', (req, res, next) => {
  const { id } = req.params;
  
  db.findById(id)
  .then(user => {

    if (user) {
      res.json(user)
    }

    // not sure if the best way
    next(new Error("The user with the specified ID does not exist."))
    
  })
  // .catch((err) => {    
  //     res.status(404).json({ message: err })
  // })

})

server.listen(5001, () => {
  console.log('Server is listening');
})