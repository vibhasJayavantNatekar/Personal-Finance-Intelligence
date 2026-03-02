const express = require('express')
const mongoose = require('mongoose')
const {expenseDiscipline}  = require('../Services/health.service')

const score = async (req, res)=> {
    const {userID} = req.params;
      
    try {
        const score = await expenseDiscipline(userID);
        res.status(200).json({score})
       
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}




module.exports = {score }