const Expenses = require('../Models/expense')
const express = require("express")
const mongoose = require('mongoose')
const { getTotalExpenseByUser, spendByCategory, monthTomonthTrend } = require('../Services/expenses.service')

//Create Expenses

const createExpense = async (req, res) => {

    const { userID, amt, category, date } = req.body

    try {
        const expense = await Expenses.create({ userID, amt, category, date })
        res.status(200).json(expense)
    } catch (error) {

        res.status(500).json(error)
    }
}

//Get Expenses

const getExpenses = async (req, res) => {

    try {
        const expenses = await Expenses.find().populate('userID')
        res.status(200).json({ expenses })
    } catch (error) {

        res.status(200).json(error)
    }
}

//Get Expenses by ID

const getExpensesByID = async (req, res) => {
    const { _id } = req.params

    try {
        const user = await Expenses.find({ _id }).populate('userID')
        res.status(200).json({ user })

    } catch (error) {

        res.status(500).json(error)
    }
}

//Update Expenses

const updateExpense = async (req, res) => {

    const { id } = req.params
    const { amt, category, date } = req.body

    try {
        const expense = await Expenses.findByIdAndUpdate(id, { amt, category, date })
        res.status(200).json({ expense })
    } catch (error) {
        res.status(500).json(error)

    }
}

//Delete Expense

const deleteExpense = async (req, res) => {

    const { id } = req.params

    try {
        await Expenses.findByIdAndDelete(id)
        res.status(200).json({ message: "Delete Successfull !" })
    } catch (error) {

        res.status(500).json(error)
    }
}

//getTotalExpenses

const getTotalExpenses = async (req, res) => {
    const { userID } = req.params
  
    try {
        const totalExpenses = await getTotalExpenseByUser(userID)
        res.status(200).json({ totalExpenses })
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//Monthly Spending

const monthTomonthSpending = async (req, res) => {
    const { userID } = req.params

    try {
        const monthlySpending = await monthTomonthTrend(userID)
        res.status(200).json({ monthlySpending})

    } catch (error) {
        res.status(500).json(error.message)
    }
}


//getSpendByCategory 

const spendingByCategory = async (req, res) => {
    const { userID } = req.params

    try {
        const spendByCat = await spendByCategory(userID)
        res.status(200).json({ spendByCat })
    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports = { createExpense, getExpenses, updateExpense, deleteExpense, getExpensesByID, getTotalExpenses, spendingByCategory, monthTomonthSpending }


