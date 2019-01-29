const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const sc = require('./controllers/swag_controller')
const ac = require('./controllers/auth.controller')

const app = express()

app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true
}))
app.use(checkForSession)

app.get('/api/swag', sc.read)
app.get('/api/user', ac.getUser)
app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)



const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))