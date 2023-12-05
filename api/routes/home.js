const express = require('express');
const mainpage = require('../controllers/home')
const {like, dislike} = require('../controllers/rate')
const searchMovies = require('../controllers/filters')
const bytitleID = require('../controllers/bytitleID')
const searchTitle = require('../controllers/searchtitle')
const bygenre = require('../controllers/bygenre')
const bynameID = require('../controllers/bynameID')
const searchname = require('../controllers/searchname')
const likedmovies = require('../controllers/likedmovies')
const dislikedmovies = require('../controllers/dislikedmovies')

router = express.Router()

router.get('/', mainpage)
router.post('/rate/like/:userId/:movieId', like)
router.post('/rate/dislike/:userId/:movieId', dislike)
router.get('/filters', searchMovies)
router.get('/title/:titleID', bytitleID)
router.get('/searchtitle', searchTitle)
router.get('/bygenre', bygenre)
router.get('/name/:nameID', bynameID)
router.get('/searchname', searchname)
router.get('/likedmovies/:userid', likedmovies)
router.get('/dislikedmovies/:userid', dislikedmovies)

module.exports = router
