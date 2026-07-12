const express = require('express')
const mongoose = require('mongoose')
const Loan = require('../Models/loan')
const User = require('../Models/userModel')
const apiResponse = require('../Utils/apiResponse')
const { getLoanFullSummary } = require('../Services/loan.serice')
const loan = require('../Models/loan')
const { getLoanInsights } = require('../Services/lon.insights.service')

//create loan

const create = async (req, res, next) => {

    const userID = req.user.id
    const { loanType, principleAmount, interestRate, tenure, emi, startDate, loanStatus } = req.body

    try {

        // const userExist = await   User.findById(userID)

        // if(!userExist){
        //     res.status(500).json("User not exist")
        // }
        console.log(req.body);
        const loan = await Loan.create({userID, loanType, principleAmount, interestRate, tenure, emi, startDate, loanStatus})
        res.status(200).json(
            apiResponse(
                true,
                "Create Loan Successfully",
                loan
            )
        )
    } catch (error) {

        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Fill all the details"
        }

        next(err)
    }

}

// get Loans

const getLoans = async (req, res, next) => {


    try {
        const loans = await Loan.find().populate('userID')
        res.status(200).json(

            apiResponse(
                true,
                "Fetch Loans Successfully",
                loans
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

//get Loan by id

const getLoanbyId = async (req, res, next) => {

    const { id } = req.params

    try {
        const loan = await Loan.findById(id)
        res.status(200).json(


            apiResponse(
                true,
                "Fetch Loan Successfully",
                loan
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

//get Loan by user ID

const getLoansByuserID = async (req, res, next) => {
    const userID = req.user.id

    try {
        const loans = await Loan.find({ userID })
        res.status(200).json(

            apiResponse(
                true,
                "Fetch Loan Successfully",
                loans
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

//update loan 

const updateLoan = async (req, res, next) => {

    const { id } = req.params;
    const { loanType, principleAmount, interestRate, tenure, emi, startDate, loanStatus } = req.body;

    try {
        const updatedLoan = await Loan.findByIdAndUpdate(id, { loanType, principleAmount, interestRate, tenure, emi, startDate, loanStatus })
        res.status(200).json(

            apiResponse(
                true,
                "Update  Loan Data Successfully",
                updateLoan
            )

        )
    } catch (error) {

        const err = {
            status: 500,
            message: error.message,
            extraDetails: " Fill all details for update.. "
        }

        next(err)

    }

}

//delete loan

const deleteLoan = async (req, res, next) => {
    const { id } = req.params

    try {
        const delLoan = await Loan.getLoanbyIdAndDelete(id)
        res.status(200).json(

            apiResponse(
                true,
                "Delete Loan Successfully",
                delLoan
            )

        )
    } catch (error) {

        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error while delete loan.."
        }

        next(err)
    }
}

const getloanSummary = async (req, res, next) => {
    const userID = req.user.id

    try {
        const summary = await getLoanFullSummary(userID)
        res.status(200).json(

            apiResponse(
                true,
                "Fetch Loan Successfully",
                summary
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

const loanInsights = async (req, res, next) => {

    try {

        const data = await getLoanInsights(req.user.id)

        res.status(200).json(

            apiResponse(
                true,
                "Loan insights fetched successfully",
                data
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


module.exports = { create, getLoans, getLoanbyId, getLoansByuserID, updateLoan, deleteLoan, getloanSummary, loanInsights }
