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

// Admin routes music list
routes.post('/admin/list', admLoginAuth, ListController.create)
routes.delete('/admin/delete-list/:name', admLoginAuth, ListController.remove)
routes.post('/admin/addMusicToList', admLoginAuth, ListController.addMusicToList)
routes.delete('/admin/list/:param', admLoginAuth, ListController.removeMusicFromList)

// General routes
routes.get('/musics-from-list/:listName', ListController.musicsFromList)
routes.get('/musics', MusicController.list)
routes.get('/list', ListController.list)

module.exports = routes
