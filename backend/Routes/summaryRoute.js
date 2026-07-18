const express = require('express')
const router = express.Router()
const {requireAuth} = require('../Middleware/authMiddleware')
const {getDashboardSummary, expenseAnalytics, expenseAllocation, loanAllocation, investmentAnalytics, investmentPerformance, investmentAllocation, loanAnalytics, getHolding, investmentInsights, loanInsights, expensesInsights, expenseCalendar} = require('../Controller/summaryController')
const { getHoldingCounts } = require('../Services/investment.service')

//Base url - http://localhost:5000/api/v1/


router.get("/expensesanalytics", requireAuth, expenseAnalytics)
router.get("/expensesallocation", requireAuth,expenseAllocation )
router.get("/expensesInsights",requireAuth,expensesInsights)
router.get("/expenseCalendar",requireAuth,expenseCalendar)
router.get("/loanAllocation",requireAuth, loanAllocation)
router.get("/loanAnalytics",requireAuth, loanAnalytics)
router.get("/loanInsights",requireAuth,loanInsights)
router.get("/investmentAnalytics",requireAuth, investmentAnalytics)
router.get("/investmentPerformance",requireAuth, investmentPerformance)
router.get("/investmentAllocation",requireAuth, investmentAllocation)
router.get("/investmentInsights",requireAuth,investmentInsights)
router.get('/holding',requireAuth,getHolding)




module.exports = router