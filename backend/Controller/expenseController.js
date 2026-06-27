const Expenses = require('../Models/expense')
const express = require("express")
const mongoose = require('mongoose')
const apiResponse = require('../Utils/apiResponse')
const { getTotalExpenseByUser, spendByCategory, monthTomonthTrend } = require('../Services/expenses.service')
const {getExpenseInsights} = require('../Services/expenseInsight.service')

//Create Expenses

const createExpense = async (req, res, next) => {

    const userID = req.user.id
    const { amt, category, date } = req.body

    try {
        const expense = await Expenses.create({ userID, amt, category, date })
        res.status(200).json(

            apiResponse(
                true,
                "Expenses Create Successfully",
                expense
            )

        )


    } catch (error) {

       

        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Please Fill the all details.."
        }

        next(err)
    }
}

//Get Expenses

const getExpenses = async (req, res, next) => {


    try {
        const expenses = await Expenses.find().populate('userID')
        res.status(200).json(apiResponse(
            true,
            "Expenses Fetch Successfully",
            expense
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

//Get Expenses by ID 

const getExpensesByID = async (req, res, next) => {
    const { _id } = req.user.id

    try {
        const expense = await Expenses.find({ _id }).populate('userID')
        res.status(200).json(apiResponse(
            true,
            "Expenses Fetch Successfully",
            expense
        )
        )

    } catch (error) {

        //res.status(500).json(error)
        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error while fetching info.."
        }

        next(err)
    }
}

// Get Expenses by userID

const getExpensesByUserID = async (req, res, next) => {
    // const{userID} = req.params
    const userID = req.user.id;

    try {
        const expenses = await Expenses.find({ userID })
        res.status(200).json(
            apiResponse(
                true,
                "Expenses Fetch Successfully",
                expenses
            )

        )
    } catch (error) {
        // res.status(500).json(error)
        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error while fetching info.."
        }

        next(err)
    }
}

//Update Expenses

const updateExpense = async (req, res, next) => {

    const { id } = req.params
    const { amt, category, date } = req.body

    try {
        const expense = await Expenses.findByIdAndUpdate(id, { amt, category, date })

        res.status(200).json(

            apiResponse(
                true,
                "Expenses Update Successfully",
                expense
            )

        )
    } catch (error) {

        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Please fill all details that need to be update"
        }

        next(err)

    }
}

//Delete Expense

const deleteExpense = async (req, res, next) => {

    const { id } = req.params

    try {
        const expense = await Expenses.findByIdAndDelete(id)
        res.status(200).json(

            apiResponse(
                true,
                "Expenses Delete Successfully",
                expense
            )

        )
    } catch (error) {



        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error while deleting info"
        }

        next(err)

    }
}

//getTotalExpenses

const getTotalExpenses = async (req, res, next) => {
    const userID = req.user.id

    try {
        const totalExpenses = await getTotalExpenseByUser(userID)
        res.status(200).json(

            apiResponse(
                true,
                "Fetch Successfully",
                totalExpenses
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


//Monthly Spending

const monthTomonthSpending = async (req, res, next) => {
    const userID = req.user.id

    try {
        const monthlySpending = await monthTomonthTrend(userID)

        res.status(200).json(

            apiResponse(
                true,
                "Fetch Monthly Spending Successfully",
                monthlySpending
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


//getSpendByCategory 

const spendingByCategory = async (req, res, next) => {
    const userID = req.user.id

    try {
        const spendByCat = await spendByCategory(userID)
        res.status(200).json(
            apiResponse(
                true,
                "Fetch Speding by Category Successfully",
                spendByCat
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

const expenseInsights = async (req, res, next) => {

    try {

        const data =
            await getExpenseInsights(req.user.id)

        res.status(200).json(

            apiResponse(
                true,
                "Expense Insights fetched successfully",
                data
            )

        )

    } catch (error) {

        next(error)

    }

}

module.exports = {expenseInsights}

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense, getExpensesByID, getExpensesByUserID, getTotalExpenses, spendingByCategory, monthTomonthSpending, expenseInsights }


