const express = require('express')
const mongoose = require('mongoose')
const apiResponse = require('../Utils/apiResponse')
const { buildLoanMatch, getAllActiveAnalytics, getAllCompletedAnalytics, getPersonalAllAnalytics, getPersonalActiveAnalytics, getPersonalCompletedAnalytics, getHomeAllAnalytics, getHomeActiveAnalytics, getEducationAllAnalytics, getEducationActiveAnalytics, getEducationCompletedAnalytics, getCarAllAnalytics, getCarActiveAnalytics, getCarCompletedAnalytics, getGoldAllAnalytics, getGoldActiveAnalytics, getGoldCompletedAnalytics, getAgricultureAllAnalytics, getAgricultureActiveAnalytics, getAgricultureCompletedAnalytics, getBusinessAllAnalytics, getBusinessActiveAnalytics, getBusinessCompletedAnalytics
} = require('../Services/loan.serice')
const { getLoanTypeAllocation, getAllAllAllocation, getAllActiveAllocation, getAllCompletedAllocation } = require('../Services/loan.serice')
const { totalExpenses, totalInvestment, totalLoans, expensesAnalytics, expensesAllocation, loanOverview } = require('../Services/summary.service')
const {getAllInvestmentAnalytics, getAllSoldInvestmentAnalytics, getInvestmentTypeAnalytics, getInvestmentTypeSoldAnalytics} = require('../Services/investment.service')
const {getAllPerformance, getTypePerformance, getAllSoldPerformance, getTypeSoldPerformance } = require("../Services/investment.service")
const {getAllAllocation, getTypeAllocation} = require('../Services/investment.service')

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
        } else if (type === "BUSSINESS" && status === "ALL") {
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

const loanAllocation = async (req, res, next) => {

    const userID = req.user.id
    const { type = "ALL", status = "ALL" } = req.query

    try {
        let data


        if (type === "ALL" && status === "ALL") {
            data = await getAllAllAllocation(userID);
        }
        else if (type === "ALL" && status === "ACTIVE") {
            data = await getAllActiveAllocation(userID);
        }
        else if (type === "ALL" && status === "COMPLETED") {
            data = await getAllCompletedAllocation(userID);
        }
        else {
            data = await getLoanTypeAllocation(userID, type, status);
        }

        res.status(200).json(

            apiResponse(
                true,
                "Loan Allocation Data Fetch Successfully",
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

const investmentAnalytics = async (req, res, next) => {

    const userID = req.user.id;

    const {
        type = "ALL",
        status = "ACTIVE"
    } = req.query;

    try {

        let data;

        if (type === "ALL" && status === "SOLD") {

            data = await getAllSoldInvestmentAnalytics(userID);

        }
        else if (type === "ALL") {

            data = await getAllInvestmentAnalytics(userID, status);

        }
        else if (status === "SOLD") {

            data = await getInvestmentTypeSoldAnalytics(
                userID,
                type
            );

        }
        else {

            data = await getInvestmentTypeAnalytics(
                userID,
                type,
                status
            );

        }

        return res.status(200).json(
            apiResponse(
                true,
                "Investment analytics fetched successfully.",
                data
            )
        );

    } catch (error) {

        const err = {
            status: 500,
            message: error.message,
            extraDetails: "Error While Fetching the data"
        }

        next(err)

    }

}

const investmentPerformance = async (req, res, next) => {

    const userID = req.user.id
    const { type = "ALL", status = "ACTIVE" } = req.query

    try {

        let data

        if (type === "ALL" && status === "SOLD") {

            data = await getAllSoldPerformance(userID)

        } else if (type === "ALL") {

            data = await getAllPerformance(userID, status)

        } else if (status === "SOLD") {

            data = await getTypeSoldPerformance(userID, type)

        } else {

            data = await getTypePerformance(userID, type, status)

        }

        res.status(200).json(
            apiResponse(
                true,
                "Investment Performance fetched successfully",
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

const investmentAllocation = async (req, res, next) => {

    const userID = req.user.id;

    const { type = "ALL", status = "ALL"} = req.query;

    try {

        let data;

        if (type === "ALL") {

            data = await getAllAllocation(userID, status);

        } else {

            data = await getTypeAllocation( userID,type, status );

        }

        res.status(200).json(

            apiResponse(
                true,
                "Investment Allocation fetched successfully",
                data
            )

        );

    } catch (error) {

        const err = {

            status: 500,

            message: error.message,

            extraDetails: "Error while fetching investment allocation"

        };

        next(err);

    }

};

const summary = async (req, res) => {
    const userID = req.user.id;

    try {



    } catch (error) {

    }

}

module.exports = { getDashboardSummary, expenseSummary, loanSummary, loanAllocation, investmentAnalytics, investmentPerformance, investmentAllocation }

