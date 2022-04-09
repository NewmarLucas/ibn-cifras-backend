const express = require('express')
const routes = express.Router()
const admLoginAuth = require('./middlewares/jwtAuth')

const MusicController = require('./controllers/musicController')
const UserController = require('./controllers/userController')

// Admin routes
routes.post('/admin', UserController.login)
routes.post('/admin/register', UserController.register)
routes.get('/admin/musics', admLoginAuth, MusicController.list)
routes.post('/admin/music', admLoginAuth, MusicController.register)

module.exports = routes
