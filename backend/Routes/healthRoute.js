const express = require('express')
const {requireAuth} = require('../Middleware/authMiddleware')
const router = express.Router()
const {score} = require('../Controller/healthController')

//Base url - http://localhost:5000/health/api/v1


router.get('/score', requireAuth,score)



module.exports = router


