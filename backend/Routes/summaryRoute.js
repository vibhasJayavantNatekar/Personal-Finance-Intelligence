const express = require('express')
const router = express.Router()
const {requireAuth} = require('../Middleware/authMiddleware')
const {getDashboardSummary, expenseSummary, loanSummary} = require('../Controller/summaryController')

//Base url - http://localhost:5000/expenses/api/v1

router.get('/summary',requireAuth,expenseSummary)
router.get("/loanSummary",requireAuth, loanSummary)

module.exports = router