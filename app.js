const express = require('express')
var bodyParser = require('body-parser')
require('./models')
var userCtrl = require('./controllers/userController')
const app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})


  app.get('/add', userCtrl.addUser)

  
  

  app.get('/users', userCtrl.getUsers)
  app.get('/users/:id', userCtrl.getUser)
  
  app.post('/users', userCtrl.postUsers)

  app.delete('/users/:id', userCtrl.deleteUser)

  app.patch('/users/:id', userCtrl.patchUser)

  app.get('/one-to-one', userCtrl.oneToOneUser)//getUser

  app.get('/one-to-many', userCtrl.oneToManyUser)//getUsers


  
//User.sync({ force: true });
//Contact.sync({ force: true });


//User.drop();

app.listen(3000,()=>{
    console.log('App will run on: http://localhost:3000')
})