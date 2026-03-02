const express = require('express')
const router = express.Router()
const {score} = require('../Controller/healthController')

//Base url - http://localhost:5000/health/api/v1


router.get('/userID',score)


module.exports = router


