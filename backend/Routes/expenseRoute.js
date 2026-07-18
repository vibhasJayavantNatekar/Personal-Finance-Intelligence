const express = require('express')
const router = express.Router()
const { requireAuth } = require('../Middleware/authMiddleware')
const { createExpense, getExpenses, updateExpense, deleteExpense, getExpensesByID, getExpensesByUserID, getTotalExpenses, monthTomonthSpending, spendingByCategory, expenseInsights } = require('../Controller/expenseController')
const {expenseAnalytics, expenseAllocation} = require('../Controller/summaryController')
//Base url - http://localhost:5000/expenses/api/v1

router.post('/', requireAuth, createExpense)

router.get('/totalExpenses', requireAuth, getTotalExpenses)
router.get('/monthTomonth', requireAuth, monthTomonthSpending)

router.get("/spendByCat", requireAuth, spendingByCategory)

router.get( "/insights", requireAuth,expenseInsights  )

router.get('/user', requireAuth, getExpensesByUserID)

router.get('/', requireAuth, getExpensesByUserID)
router.get('/:_id', requireAuth, getExpensesByID)



router.put("/:id", requireAuth, updateExpense) //:id = expenses Id
router.delete("/:id", requireAuth, deleteExpense) //:id = expenses Id




module.exports = router