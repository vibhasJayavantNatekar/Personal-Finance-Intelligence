const express = require('express')
const {requireAuth} = require('../Middleware/authMiddleware')
const router = express.Router()
const {score} = require('../Controller/healthController')
const {healthInsights} = require('../Controller/healthInsight.controller')

//Base url - http://localhost:5000/health/api/v1


router.get('/score', requireAuth,score)
router.get( "/health-insights", requireAuth, healthInsights)


module.exports = router


