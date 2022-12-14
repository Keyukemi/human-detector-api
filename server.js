import express from 'express';
import bcrypt, { hash } from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImage from './controllers/image.js';
import handleImageUrl from './controllers/imageurl.js'


  
//importing knex
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});


//Creating a server and exporting 
const app = express();

//using bodyparser cos its a middleware
app.use(express.json());
//cors allows front end to access API
app.use(cors())

app.get('/', (req, res) => { res.send('It works') })


//The sign in post request
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })

//Register Post request
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

//Get profile request
app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) })

//add to the number of entries when image is uploaded
app.put('/image', (req, res) => { handleImage(req, res, db) })

//
app.post('/imageurl', (req, res) => { handleImageUrl(req, res) })



app.listen(process.env.PORT || 3000, () => {
  console.log('app is running');
}); 