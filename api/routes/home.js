const express = require('express');
const mainpage = require('../controllers/home')
const {like, dislike} = require('../controllers/rate')
const searchMovies = require('../controllers/filters')
const bytitleID = require('../controllers/bytitleID')
const searchTitle = require('../controllers/searchtitle')
const bygenre = require('../controllers/bygenre')
const bynameID = require('../controllers/bynameID')
const searchname = require('../controllers/searchname')

router = express.Router()

router.get('/', mainpage)
router.post('/rate/like/:userId/:movieId', like)
router.post('/rate/dislike/:userId/:movieId', dislike)
router.get('/filters/:searchText', searchMovies)
router.get('/title/:titleID', bytitleID)
router.get('/title/searchtitle', searchTitle)
router.get('/title/bygenre', bygenre)
router.get('/title/:nameID', bynameID)
router.get('/title/searchname', searchname)


module.exports = router