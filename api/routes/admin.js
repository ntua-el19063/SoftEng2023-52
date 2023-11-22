const express = require('express');
router = express.Router()
const healthcheck = require('../controllers/healthcheck')

router.get('/healthcheck', healthcheck)

module.exports = router