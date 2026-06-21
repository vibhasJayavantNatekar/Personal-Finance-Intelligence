const express = require('express')
const mongoose = require('mongoose')
const apiRsponse = require('../Utils/apiResponse')
const { expenseDiscipline } = require('../Services/health.service')

const score = async (req, res, next) => {
    const userID = req.user.id

    try {
        const score = await expenseDiscipline(userID);
        res.status(200).json(
            
            apiResponse(
            true,
            "Fetch Scor Successfully",
            score
        )
    
    )

    } catch (error) {
        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error while fetching info.."
        }

        next(err)
    }

}




module.exports = { score }