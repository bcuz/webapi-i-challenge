require('dotenv').config(); // add this line as the first thing to run1
const express = require('express');
const cors = require('cors');

const db = require('./data/db');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(cors())

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

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
  .then(user => {

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: "The user with the specified ID does not exist." })
    }
    
  })
  .catch(() => {    
      res.status(500).json({ error: "The user information could not be retrieved." })
  })

})

server.post('/api/users', (req,res) => {
    
  const newUser = req.body
  let { name, bio } = req.body;

  if (!name || !bio) {    
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.insert(newUser)
  .then(addedUser =>{
        
      res.status(201).json(addedUser);
    
  })
  .catch(() => {
      res.status(500).json({ error: "There was an error while saving the user to the database" })
  })

})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  let { name, bio } = req.body;

  if (!name || !bio) {    
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }  

  db.update(id, req.body)
  .then(updateUser => {    

    if(updateUser) {
      db.findById(id)
        .then(user => {

          if (user) {
            res.json(user)
          } else {
            res.status(404).json({ error: "The user with the specified ID does not exist." })
          }
          
        })
        .catch(() => {    
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
    } else {
        res.status(404).json({ error: "The user with the specified ID does not exist." })       
    }
  })
  .catch(() => {
    res.status(500).json({error: "The user information could not be modified." })
})
})

server.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let user = await db.findById(id)

    if (user) {      
      try {
        let removeSuccess = await db.remove(id)
  
        if (removeSuccess) {
          res.json(user)
        } else {
          res.status(404).json({ error: "The user with the specified ID does not exist." })
        }
        
      } catch (err) {
          res.status(500).json({ error: "The user could not be removed" })
      }
    } else {
      res.status(404).json({ error: "The user with the specified ID does not exist." })
    }
  } catch (err) {
      res.status(500).json({ error: "The user information could not be retrieved." })
  }
})

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});