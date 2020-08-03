const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//importing end point modules
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const dataBase = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.get('/', (reg, res) => {res.send(database.users)})
app.post('/register', (req, res) => {register.handleRegister(req, res, dataBase, bcrypt)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, dataBase, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, dataBase)})
app.put('/image', (req, res) => {image.handleImage(req, res, dataBase)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3001, () => {
    console.log('app is running on port 3001');
})

