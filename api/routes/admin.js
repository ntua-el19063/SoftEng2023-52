const express = require('express');
router = express.Router()
const healthcheck = require('../controllers/healthcheck')
const uploadtsv = require('../controllers/uploadtsv')

router.get('/healthcheck', healthcheck)
router.post('/upload/titlebasics', uploadtsv)

module.exports = router

i am just testing some things
