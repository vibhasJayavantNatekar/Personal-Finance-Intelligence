const express = require('express')
const router = express.Router()
const {createInvestment , getInvestment , getInvestmentById , updateInvestment , deleteInvestment , Closed , Sold,Active } = require('../Controller/investmentController')

//Base url - http://localhost:5000/investment/api/v1

router.get('/sold',Sold)
router.get('/active',Active)

router.put('/closed/:userID' , Closed) //Closed Investments


router.post('/',createInvestment) //Create investment
router.get('/',getInvestment)  //Retrive investment
router.get('/:id',getInvestmentById) // Retrive investment by its ID
router.put('/:id',updateInvestment)  // Update investment
router.delete("/:id",deleteInvestment) //Delete investment




// /investments/pnl → Profit / Loss per investment

// /investments/summary → Portfolio summary

// /investments/allocation → Asset allocation

// /investments/insights → Investment insights

module.exports = router