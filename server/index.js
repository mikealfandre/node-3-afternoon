const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const sc = require('./controllers/swag_controller')
const ac = require('./controllers/auth_controller')
const cc = require('./controllers/cart_controller')
const searchC = require('./controllers/search_controller')

const app = express()

app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', sc.read)
app.get('/api/user', ac.getUser)
app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)

app.post('/api/cart', cc.add)
app.post('/api/cart/checkout', cc.checkout)
app.delete('/api/cart', cc.delete)

app.get('/api/search', searchC.search)



const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))