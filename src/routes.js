const express = require('express');
const routes = express.Router();

const MusicController = require('./controllers/musicController')

// Admin routes
routes.post('/admin/music', MusicController.register)

module.exports = routes;