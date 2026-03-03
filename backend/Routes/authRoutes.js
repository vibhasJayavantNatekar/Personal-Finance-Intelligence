const express = require('express')
const router = express.Router()
const {register  , logIn} = require('../Controller/authController')

//Base url - http://localhost:5000/auth/api/v1

router.post('/register' , register)
router.post('/login' , logIn)

module.exports = router