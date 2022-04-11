const express = require('express')
const routes = express.Router()
const admLoginAuth = require('./middlewares/jwtAuth')

const MusicController = require('./controllers/musicController')
const UserController = require('./controllers/userController')
const ListController = require('./controllers/listController')

// Admin routes
routes.post('/admin', UserController.login)
routes.post('/admin/register', UserController.register)
routes.post('/admin/music', admLoginAuth, MusicController.register)
routes.put('/admin/music/:id', admLoginAuth, MusicController.edit)
routes.delete('/admin/music/:id', admLoginAuth, MusicController.delete)

// General routes
routes.get('/musics', MusicController.list)
routes.get('/list', ListController.list)
routes.post('/list', ListController.addMusicToList)
routes.delete('/list/:musicId', ListController.removeMusicFromList)

module.exports = routes
