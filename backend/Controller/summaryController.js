const express = require('express')
const mongoose = require('mongoose')
const apiResponse = require('../Utils/apiResponse')
const { buildLoanMatch, getAllActiveAnalytics, getAllCompletedAnalytics, getPersonalAllAnalytics, getPersonalActiveAnalytics, getPersonalCompletedAnalytics, getHomeAllAnalytics, getHomeActiveAnalytics, getEducationAllAnalytics, getEducationActiveAnalytics, getEducationCompletedAnalytics, getCarAllAnalytics, getCarActiveAnalytics, getCarCompletedAnalytics, getGoldAllAnalytics, getGoldActiveAnalytics, getGoldCompletedAnalytics, getAgricultureAllAnalytics, getAgricultureActiveAnalytics, getAgricultureCompletedAnalytics, getBusinessAllAnalytics, getBusinessActiveAnalytics, getBusinessCompletedAnalytics
} = require('../Services/loan.serice')
const { totalExpenses, totalInvestment, totalLoans, expensesAnalytics, expensesAllocation, loanOverview } = require('../Services/summary.service')


const getDashboardSummary = async (req, res, next) => {

    try {
        const userID = req.user.id;

        const totalExp = await totalExpenses(userID)
        const totalInv = await totalInvestment(userID)
        const totalLoan = await totalLoans(userID)
        res.status(200).json(

            apiResponse(
                true,
                "Fetch Dashboard Summary Successfully",
                { totalExp, totalInv, totalLoan }
            )

        )

    } catch (error) {

        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error While Fetching the data"
        }

        next(err)

    }

}

const expenseSummary = async (req, res, next) => {

    const userID = req.user.id
    const {
        category = "ALL",
        month = "ALL",
        year = "ALL"
    } = req.query;

    try {


        const analytics = await expensesAnalytics(userID, category, month)
        const allocation = await expensesAllocation(userID, category, month, year)
        res.status(200).json(

            apiResponse(
                true,
                "Fetch expenses Summary Successfully",
                { analytics, allocation }
            )

        )
    } catch (error) {


        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error While Fetching the data"
        }

        next(err)

    }

}

const loanSummary = async (req, res, next) => {
    const userID = req.user.id
    const { type = "CAR", status = "ALL", month = "ALL", year = "ALL" } = req.query

    try {
        // const overview = await loanOverview(userID)
        buildLoanMatch(userID, type, status)
        let data
        if (type === "ALL" && status === "ACTIVE") {
            data = await getAllActiveAnalytics(userID)
        } else if (type === "ALL" && status === "CLOSED") {
            data = await getAllCompletedAnalytics(userID)
        } else if (type === "PERSONAL" && status === "ALL") {
            data = await getPersonalAllAnalytics(userID)
        } else if (type === "PERSONAL" && status === "ACTIVE") {
            data = await getPersonalActiveAnalytics(userID)
        } else if (type === "PERSONAL" && status === "COMPLETED") {
            data = await getPersonalCompletedAnalytics(userID)
        } else if (type === "HOME" && status === "ALL") {
            data = await getHomeAllAnalytics(userID)
        } else if (type === "HOME" && status === "ACTIVE") {
            data = await getHomeActiveAnalytics(userID)
        } else if (type === "EDUCATION" && status === "ALL") {
            data = await getEducationAllAnalytics(userID)
        } else if (type === "EDUCATION" && status === "ACTIVE") {
            data = await getEducationActiveAnalytics(userID)
        } else if (type === "EDUCATION" && status === "COMPLETED") {
            data = await getEducationCompletedAnalytics(userID)
        } else if (type === "CAR" && status === "ALL") {
            data = await getCarAllAnalytics(userID)
        } else if (type === "CAR" && status === "ACTIVE") {
            data = await getCarActiveAnalytics(userID)
        } else if (type === "CAR" && status === "COMPLETED") {
            data = await getCarCompletedAnalytics(userID)
        } else if (type === "GOLD" && status === "ALL") {
            data = await getGoldAllAnalytics(userID)
        } else if (type === "GOLD" && status === "ACTIVE") {
            data = await getGoldActiveAnalytics(userID)
        } else if (type === "GOLD" && status === "COMPLETED") {
            data = await getGoldCompletedAnalytics(userID)
        } else if (type === "AGRICULTURE" && status === "ALL") {
            data = await getAgricultureAllAnalytics(userID)
        } else if (type === "AGRICULTURE" && status === "ACTIVE") {
            data = await getAgricultureActiveAnalytics(userID)
        } else if (type === "AGRICULTURE" && status === "COMPLETED") {
            data = await getAgricultureCompletedAnalytics(userID)
        }else if (type === "BUSSINESS" && status === "ALL") {
            data = await getBusinessAllAnalytics(userID)
        } else if (type === "BUSSINESS" && status === "ACTIVE") {
            data = await getBusinessActiveAnalytics(userID)
        } else if (type === "BUSSINESS" && status === "COMPLETED") {
            data = await getBusinessCompletedAnalytics(userID)
        }
            //const AllActiveAnalytics = await getAllActiveAnalytics(userID)

            res.status(200).json(

                apiResponse(
                    true,
                    "Fetch Loan Summary Successfully",
                    data
                )

            )
        } catch (error) {

            const err = {
                status: 500,
                message: error.message,
                extraDetails: "Error While Fetching the data"
            }

            next(err)

        }
    }

const summary = async (req, res) => {
        const userID = req.user.id;

        try {



        } catch (error) {

        }

    }

    module.exports = { getDashboardSummary, expenseSummary, loanSummary }

