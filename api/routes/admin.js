const express = require('express');
router = express.Router()
const healthcheck = require('../controllers/healthcheck')
const uploadtb = require('../controllers/uploadtb')
const uploadakas = require('../controllers/uploadakas')
const uploadnamebasics = require('../controllers/uploadnamebasics')
const uploadtitlecrew = require('../controllers/uploadtitlecrew')
const uploadtitleepisode = require('../controllers/uploadtitleepisode')
const uploadtitleprincipals = require('../controllers/uploadtitleprincipals')
const uploadtitleratings = require('../controllers/uploadtitleratings')
const usermod = require('../controllers/usermod')
const users = require('../controllers/users')



router.get('/healthcheck', healthcheck)
router.post('/upload/titlebasics', uploadtb)
router.post('/upload/titleakas', uploadakas)
router.post('/upload/namebasics', uploadnamebasics)
router.post('/upload/titlecrew', uploadtitlecrew)
router.post('/upload/titleepisode', uploadtitleepisode)
router.post('/upload/titleprincipals', uploadtitleprincipals)
router.post('/upload/titleratings', uploadtitleratings)
<<<<<<< HEAD
=======
router.post('/resetall', resetall)
>>>>>>> 47ab34b23087ebab625e81cfcbf0ec583f3ba05b
router.post('/usermod/:username/:password', usermod)
router.get('/users/:username', users)

module.exports = router