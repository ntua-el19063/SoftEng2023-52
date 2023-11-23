const express = require('express');
router = express.Router()
const healthcheck = require('../controllers/healthcheck')
const uploadtb = require('../controllers/uploadtb')
const uploadakas = require('../controllers/uploadakas')


router.get('/healthcheck', healthcheck)
router.post('/upload/titlebasics', uploadtb)
router.post('/upload/titleakas', uploadakas)


module.exports = router