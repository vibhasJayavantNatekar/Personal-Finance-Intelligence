const express = require('express')
const mongoose = require('mongoose')
const {expenseDiscipline}  = require('../Services/health.service')

const score = async (req, res , next)=> {
    const userID = req.user.id
      
    try {
        const score = await expenseDiscipline(userID);
        res.status(200).json({score})
       
    } catch (error) {
        //res.status(500).json(error.message)
         const err = {
            status : 500,
            message : error.message,
            extraDetails : "Error while fetching info.."
        }

        next(err)
    }
    
}




module.exports = {score }