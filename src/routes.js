const express = require('express')
const routes = express.Router()

const MusicController = require('./controllers/musicController')

// Admin routes
routes.get('/admin/musics', MusicController.list)
routes.post('/admin/music', MusicController.register)

module.exports = routes
