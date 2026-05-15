const express = require('express')
const mongoose = require('mongoose')
const Investment = require('../Models/investment')
const investment = require('../Models/investment')

//Create Investment

const createInvestment = async (req, res , next) => {
     
    const userID  = req.user.id
    const { assetType, assetName, assetSymbol, investedAmt, quantity, purchaseDate, investmentStatus, } = req.body

    try {
        const investment = await Investment.create({ userID, assetType, assetName, assetSymbol, investedAmt, quantity, purchaseDate , investmentStatus })
        res.status(200).json({ investment: investment })
    } catch (error) {

        const status = 500
        const message = error.message
        const extraDetails = "Please Fill the all information"

        const err = {
            status,
            message,
            extraDetails
        }

        next(err)

        //res.status(500).json({ error: error.message })

    }

}

//Get Investments

const getInvestment = async (req, res , next) => {

     console.log(req.user);


    try {
        const investments = await Investment.find()
        res.status(200).json({ investments })
    } catch (error) {
        
        const err = {
            status : 500,
            message : error.message,
            extraDetails : "Error While fetching info.."
        }

        next(err)
    }

}

//getInvestmentById

const getInvestmentById = async (req, res , next) => {
     console.log(req.user);
    

    const {id} = req.params

    try {
        const investment = await Investment.findById(id)
        res.status(200).json({investment})
    } catch (error) {

        const err = {
            status : 500,
            message : error.message,
            extraDetails : "Error while fetching info.."
        }

        next(err)
    }

}

//Update Investment

const updateInvestment = async (req, res , next) => {
    const { id } = req.params

    const { assetType, assetName, assetSymbol, investedAmt, quantity, purchaseDate, investmentStatus } = req.body

    try {
        const investment = await Investment.findByIdAndUpdate(id ,{ assetType ,  assetName , assetSymbol,  investedAmt ,  quantity ,  purchaseDate  , investmentStatus})
        res.status(200).json({ investment })
    } catch (error) {
       // res.status(500).json(error.message)

        const err = {
            status : 500,
            message : error.message,
            extraDetails : "Please Fill the all details"
        }

        next(err)

    }

}

//Delete Investment

const deleteInvestment = async (req, res , next) => {
    const { id } = req.params
    try {
        await Investment.findByIdAndDelete(id)
        res.status(200).json({ message: "Delete Successfilly." })
    } catch (error) {
      //  res.status(500).json(error)

       const err = {
            status : 500,
            message : error.message,
            extraDetails : " Plase check the investment id. "
        }

        next(err)
    }

}

//Get Investment By UserID

const getInvestmentByUserId = async (req, res , next) => {
     console.log(req.user);
    

    const userID = req.user.id

    try {
        const investment = await Investment.find({userID})
        res.status(200).json({investment})
    } catch (error) {
       // res.status(500).json(error.message)

        const err = {
            status : 500,
            message : error.message,
            extraDetails : "Error while fetching details..."
        }

        next(err)
    }

}

//Closed Investment 

const Closed = async(req,res , next) =>{
    
    // const {userID} = req.params

    const userID = req.user.id
    const {sellDate , sellAmount} = req.body

    try {
        const closedIn = await Investment.ClosedInvestment(userID ,sellDate , sellAmount)
        res.status(200).json({closedIn})
    } catch (error) {
        //res.status(500).json(error.message)

         const err = {
            status : 500,
            message : error.message,
            extraDetails : "Fill required details of You want to Closed"
        }

        next(err)
    }

}

//get Investment SOLD

const Sold = async (req , res , next)=> {

    try {
        const sold = await investment.find({investmentStatus:"SOLD"})
        res.status(200).json({sold})
    } catch (error) {
       // res.status(500).json(error.message)

        const err = {
            status : 500,
            message : error.message,
            extraDetails : "Error while fetching info.."
        }

        next(err)
        
    }
    
}


//get Investment Active

const Active = async (req , res , next)=> {

    try {
        const sold = await investment.find({investmentStatus:"ACTIVE"})
        res.status(200).json({sold})
    } catch (error) {
       // res.status(500).json(error.message)

        const err = {
            status : 500,
            message : error.message,
            extraDetails : "Error while fetching info.."
        }

        next(err)
        
    }
    
}

// KTSA79F4XQTYE2PP api key

module.exports = { createInvestment, getInvestment, getInvestmentById, updateInvestment, deleteInvestment , getInvestmentByUserId , Closed , Sold ,Active }