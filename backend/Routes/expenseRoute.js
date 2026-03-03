const express = require('express')
const router = express.Router()
const {requireAuth} = require('../Middleware/authMiddleware')
const   {createExpense , getExpenses , updateExpense, deleteExpense, getExpensesByID , getExpensesByUserID , getTotalExpenses , monthTomonthSpending , spendingByCategory} = require('../Controller/expenseController')

//Base url - http://localhost:5000/expenses/api/v1

router.post('/', requireAuth, createExpense)

router.get('/totalExpenses',requireAuth, getTotalExpenses)
router.get('/monthTomonth', requireAuth, monthTomonthSpending)

router.get("/spendByCat" , requireAuth, spendingByCategory)

router.get('/user', requireAuth, getExpensesByUserID)

router.get('/', requireAuth, getExpenses)
router.get('/:_id', requireAuth, getExpensesByID )



router.put("/:id",requireAuth, updateExpense)
router.delete("/:id", requireAuth, deleteExpense)




module.exports = router