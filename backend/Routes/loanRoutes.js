const express = require('express')
const {create , getLoans , getLoanbyId , getLoansByuserID ,updateLoan , deleteLoan  , getloanSummary } = require('../Controller/loanController')

const router = express.Router()

// Base url - http://localhost:5000/loan/api/v1

router.post('/',create)

router.get('/',getLoans)

router.get('/:id',getLoanbyId)

router.get('/loans/:userID' , getLoansByuserID)

router.get('/loansummary/:userID' , getloanSummary)

// router.get('/totalemi/:userID', getTotalEmi)

// router.get('/incomeemiratio/:userID', getIncEmiRatio )

router.put('/:id',updateLoan)

router.delete('/:id',deleteLoan)




module.exports = router