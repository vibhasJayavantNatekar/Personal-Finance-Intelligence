const express = require('express')
const router = express.Router()
const {requireAuth} = require('../Middleware/authMiddleware')
const {createInvestment , getInvestment , getInvestmentById , updateInvestment , deleteInvestment , Closed , Sold,Active } = require('../Controller/investmentController')

//Base url - http://localhost:5000/investment/api/v1

router.get('/sold',Sold)
router.get('/active',Active)

router.put('/closed/:userID' , Closed) //Closed Investments


router.post('/', requireAuth , createInvestment) //Create investment
router.get('/',requireAuth , getInvestment)  //Retrive investment
router.get('/:id',requireAuth , getInvestmentById) // Retrive investment by its ID
router.put('/:id',requireAuth, updateInvestment)  // Update investment
router.delete("/:id",requireAuth, deleteInvestment) //Delete investment




// /investments/pnl → Profit / Loss per investment

// /investments/summary → Portfolio summary

// /investments/allocation → Asset allocation

// /investments/insights → Investment insights

module.exports = router