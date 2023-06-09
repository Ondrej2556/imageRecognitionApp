const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'root',
      database : 'smart-brain'
    }
});


const app = express();
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    
})

//HASH FOR PW= apples
const hash = "$2b$10$y5KEsv4Ho.7TySWVjyeaFOp3t/LrU29pPx8sS.gtQgkSSDWTgRRp6";

/* SING IN ROUTE */
app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login').where('email', '=', req.body.email).then(data =>{
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash); 
        if(isValid){
            db.select('*').from('users').where('email','=', req.body.email)
                .then(user=>{
                    res.json(user[0])
                })
                .catch(err=>res.status(400).json('unable to get user'))
        }else{
        res.status(400).json('wrong credentials')
        }
    })
    .catch(err=> res.status(400).json('wrong credentials'))
})



/* REGISTERING */
app.post('/register', (req, res) => {
    const {email,name,password} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
        db.transaction(trx =>{
            trx.insert({
                hash:hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .then(trx.rollback)
            .catch(err => res.status(400).json('unable to register'))
        })
    
})

/* PROFILE */
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where('id',id).then(user => {
        if(user.length) {
        res.json(user[0])
        }else{
            res.status(400).json('Error getting user')
        }
    })
})

/* IMAGE  */
app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', id).increment('entries', 1).returning('entries').then(entries =>{
        res.json(entries[0].entries);
    }).catch(err => res.status(400).json('unable to get entries'))
})


app.listen(3000, ()=>{
    console.log('listening on port 3000');
});




/*
/ --> res = this is working 
/signin --> POST (userInfo) -> success/fail
/register --> POST (newUserInfo) -> newUserObject
/profile/:userId --> GET (userInfo) -> userInfo
/image --> PUT  -> updatedUserObject
*/