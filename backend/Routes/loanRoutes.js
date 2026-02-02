const express = require('express')
const {create , getLoans , getLoanbyId ,updateLoan , deleteLoan} = require('../Controller/loanController')

const router = express.Router()

// Base url - http://localhost:5000/loan/api/v1

router.post('/',create)

router.get('/',getLoans)

router.get('/:id',getLoanbyId)

router.put('/:id',updateLoan)

router.delete('/:id',deleteLoan)




module.exports = router