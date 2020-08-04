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
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.get('/', (reg, res) => {res.send('it is working')})
app.post('/register', (req, res) => {register.handleRegister(req, res, dataBase, bcrypt)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, dataBase, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, dataBase)})
app.put('/image', (req, res) => {image.handleImage(req, res, dataBase)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

