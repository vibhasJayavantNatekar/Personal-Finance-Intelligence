const express = require('express')
const router = express.Router()
const   {createExpense , getExpenses , updateExpense, deleteExpense, getExpensesByID ,getTotalExpenses , monthTomonthSpending , spendingByCategory} = require('../Controller/expenseController')

//Base url - http://localhost:5000/expenses/api/v1

router.post('/:userID', createExpense)

router.get('/totalExpenses/:userID',getTotalExpenses)
router.get('/monthTomonth/:userID',monthTomonthSpending)

router.get("/spendByCat/:userID" , spendingByCategory)

router.get('/', getExpenses)
router.get('/:_id', getExpensesByID )
router.put("/:id",updateExpense)
router.delete("/:id", deleteExpense)




module.exports = router