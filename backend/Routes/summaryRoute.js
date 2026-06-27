const express = require('express')
const router = express.Router()
const {requireAuth} = require('../Middleware/authMiddleware')
const {getDashboardSummary, expenseAnalytics, expenseAllocation, loanAllocation, investmentAnalytics, investmentPerformance, investmentAllocation} = require('../Controller/summaryController')

//Base url - http://localhost:5000/expenses/api/v1


router.get("/expensesanalytics", requireAuth, expenseAnalytics)
router.get("/expensesallocation", requireAuth,expenseAllocation )
router.get("/loanSummaryAllocation",requireAuth, loanAllocation)
router.get("/investmentAnalytics",requireAuth, investmentAnalytics)
router.get("/investmentPerformance",requireAuth, investmentPerformance)
router.get("/investmentAllocation",requireAuth, investmentAllocation)





module.exports = router