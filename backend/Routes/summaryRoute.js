const express = require('express')
const router = express.Router()
const {requireAuth} = require('../Middleware/authMiddleware')

//Base url - http://localhost:5000/expenses/api/v1

router.get('/summary',requireAuth,)
