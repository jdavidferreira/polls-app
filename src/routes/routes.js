const express = require('express')
const router = express.Router()
const checkSession = require('../middlewares').checkSession
const registration = require('../controller/registration')
const session = require('../controller/session')
const poll = require('../controller/poll')

/* Middleware */
router.use('/', checkSession)

/* Poll */
router.get('/', poll.list)
router.post('/poll', poll.create)
router.get('/poll/:id', poll.findById)
router.post('/poll/:id/vote', poll.vote)
router.get('/poll/:id/results', poll.results)
router.get('/poll/new', poll.new)
/* Registration */
router.post('/user', registration.register)
router.get('/user/new', registration.new)
/* Session */
router.post('/session', session.login)
router.get('/session/new', session.new)
router.get('/session/logout', session.logout)

module.exports = router