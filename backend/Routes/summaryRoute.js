const express = require('express')
const router = express.Router()
const {requireAuth} = require('../Middleware/authMiddleware')
const {getDashboardSummary, expenseSummary, loanSummary, loanAllocation, investmentAnalytics, investmentPerformance, investmentAllocation} = require('../Controller/summaryController')

//Base url - http://localhost:5000/expenses/api/v1

router.get('/summary',requireAuth,expenseSummary)
router.get("/loanSummary",requireAuth, loanSummary)
router.get("/loanSummaryAllocation",requireAuth, loanAllocation)
router.get("/investmentAnalytics",requireAuth, investmentAnalytics)
router.get("/investmentPerformance",requireAuth, investmentPerformance)
router.get("/investmentAllocation",requireAuth, investmentAllocation)





module.exports = router