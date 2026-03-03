const express = require('express')
const {requireAuth} = require('../Middleware/authMiddleware')
const {create , getLoans , getLoanbyId , getLoansByuserID ,updateLoan , deleteLoan  , getloanSummary } = require('../Controller/loanController')

const router = express.Router()

// Base url - http://localhost:5000/loan/api/v1

router.post('/',requireAuth, create)

router.get('/',requireAuth, getLoans)

router.get('/:id',requireAuth, getLoanbyId)

router.get('/loans' ,requireAuth, getLoansByuserID)

router.get('/loansummary' ,requireAuth, getloanSummary)

// router.get('/totalemi/:userID', getTotalEmi)

// router.get('/incomeemiratio/:userID', getIncEmiRatio )

router.put('/:id',requireAuth, updateLoan)

router.delete('/:id',requireAuth, deleteLoan)




module.exports = router