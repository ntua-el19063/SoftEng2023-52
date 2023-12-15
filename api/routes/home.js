const express = require('express');
const {like, dislike} = require('../controllers/rate')
const searchMovies = require('../controllers/filters')
const bytitleID = require('../controllers/bytitleID')
const searchTitle = require('../controllers/searchtitle')
const bygenre = require('../controllers/bygenre')
const bynameID = require('../controllers/bynameID')
const searchname = require('../controllers/searchname')
<<<<<<< HEAD
const logout = require('../controllers/logout');
const test = require('../controllers/test');
const {likes, dislikes} = require('../controllers/likes_dislikes')
=======
const likedmovies = require('../controllers/likedmovies')
const dislikedmovies = require('../controllers/dislikedmovies')
>>>>>>> 47ab34b23087ebab625e81cfcbf0ec583f3ba05b

router = express.Router()

router.post('/logout', logout)
router.post('/rate/like/:userId/:movieId', like)
router.post('/rate/dislike/:userId/:movieId', dislike)
router.get('/filters', searchMovies)
router.get('/title/:titleID', bytitleID)
router.get('/searchtitle', searchTitle)
router.get('/bygenre', bygenre)
router.get('/name/:nameID', bynameID)
router.get('/searchname', searchname)
<<<<<<< HEAD
router.get('/test', test)
router.get('/likes/:user', likes)
router.get('/dislikes/:user', dislikes)
=======
router.get('/likedmovies/:userid', likedmovies)
router.get('/dislikedmovies/:userid', dislikedmovies)
>>>>>>> 47ab34b23087ebab625e81cfcbf0ec583f3ba05b

module.exports = router
