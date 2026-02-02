const express = require('express')
const mongoose = require('mongoose')
const Investment = require('../Models/investment')
const investment = require('../Models/investment')

//Create Investment

const createInvestment = async (req, res) => {

    const { userID, assetType, assetName, assetSymbol, investedAmt, quantity, purchaseDate, investmentStatus, } = req.body

    try {
        const investment = await Investment.create({ userID, assetType, assetName, assetSymbol, investedAmt, quantity, purchaseDate , investmentStatus })
        res.status(200).json({ investment: investment })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }

}

//Get Investments

const getInvestment = async (req, res) => {

    try {
        const investments = await Investment.find()
        res.status(200).json({ investments })
    } catch (error) {
        res.status(500).json(error)
    }

}

//getInvestmentById

const getInvestmentById = async (req, res) => {
    
    const {id} = req.params

    try {
        const investment = await Investment.findById(id)
        res.status(200).json({investment})
    } catch (error) {
        res.status(500).json(error.message)
    }

}

//Update Investment

const updateInvestment = async (req, res) => {
    const { id } = req.params

    const { assetType, assetName, assetSymbol, investedAmt, quantity, purchaseDate, investmentStatus } = req.body

    try {
        const investment = await Investment.findByIdAndUpdate(id ,{ assetType ,  assetName , assetSymbol,  investedAmt ,  quantity ,  purchaseDate  , investmentStatus})
        res.status(200).json({ investment })
    } catch (error) {
        res.status(500).json(error.message)

    }

}

//Delete Investment

const deleteInvestment = async (req, res) => {
    const { id } = req.params
    try {
        await Investment.findByIdAndDelete(id)
        res.status(200).json({ message: "Delete Successfilly." })
    } catch (error) {
        res.status(500).json(error)
    }

}

//Closed Investment 

const Closed = async(req,res) =>{
    const {userID} = req.params
    const {sellDate , sellAmount} = req.body

    try {
        const closedIn = await Investment.ClosedInvestment(userID ,sellDate , sellAmount)
        res.status(200).json({closedIn})
    } catch (error) {
        res.status(500).json(error.message)
    }

}

//get Investment SOLD

const Sold = async (req , res)=> {

    try {
        const sold = await investment.find({investmentStatus:"SOLD"})
        res.status(200).json({sold})
    } catch (error) {
        res.status(500).json(error.message)
        
    }
    
}


//get Investment Active

const Active = async (req , res)=> {

    try {
        const sold = await investment.find({investmentStatus:"ACTIVE"})
        res.status(200).json({sold})
    } catch (error) {
        res.status(500).json(error.message)
        
    }
    
}

// KTSA79F4XQTYE2PP api key

module.exports = { createInvestment, getInvestment, getInvestmentById, updateInvestment, deleteInvestment , Closed , Sold ,Active }