const express = require('express');
const mainpage = require('../controllers/home')
const {like, dislike} = require('../controllers/rate')
const searchMovies = require('../controllers/filters')
router = express.Router()

router.get('/', mainpage)
router.post('/rate/like/:userId/:movieId', like)
router.post('/rate/dislike/:userId/:movieId', dislike)
router.get('/filters/:searchText', searchMovies)


module.exports = router