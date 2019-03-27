const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')

const app = express()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/poll_app'
mongoose.connect(MONGODB_URI, {useCreateIndex: true, useNewUrlParser: true})
mongoose.connection.on('error', e => console.error)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
require('./model/User')
require('./model/Poll')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieSession({ secret: "Shh! It's a secret." }))

const mainRouter = require('./routes/routes')

app.use('/', mainRouter)

module.exports = app