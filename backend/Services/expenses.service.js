const Expenses = require('../Models/expense')
const express = require('express')
const mongoose = require('mongoose')



const mongoose = require("mongoose");

const buildExpenseMatch = ( userID, category = "ALL", month = "ALL", year = "ALL") => {

    const match = {
        userID: new mongoose.Types.ObjectId(userID)
    };

    if (category !== "ALL") {
        match.category = category;
    }

    if (month !== "ALL" && year !== "ALL") {

        const startDate = new Date(
            Number(year),
            Number(month) - 1,
            1
        )

        const endDate = new Date(
            Number(year),
            Number(month),
            1
        )

        match.date = {
            $gte: startDate,
            $lt: endDate
        }
    }

    return match
}

module.exports = buildExpenseMatch;

//Calculates Total  Expenses by Particular User 

const getTotalExpenseByUser = async (userID) => {


  const expenses = await Expenses.aggregate([
    {
      $match: {
        userID: new mongoose.Types.ObjectId(userID)
      }
    },
    {
      $group: {
        _id: "$userID",
        totalExpenses: { $sum: "$amt" }
      }
    }
  ])





  return expenses.length ? expenses[0].totalExpenses : 0

}


//Spend by particular in each month

const monthTomonthTrend = async (userID) => {
  const trend = await Expenses.aggregate([
    {
      $match: {
        userID: new mongoose.Types.ObjectId(userID)
      }
    },
    {
      $group: {
        _id: {
          month: {
            $dateToString: { format: "%Y-%m", date: "$date" }
          }
        },
        totalAmt: { $sum: { $toDouble: "$amt" } }
      }
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalAmt: 1
      }
    },
    {
      $sort: { month: 1 }
    }
  ])


  return trend
}

//spend by category by particular user

const spendByCategory = async (userID) => {

  const expenses = await Expenses.aggregate([
    {
      $match: {
        userID: new mongoose.Types.ObjectId(userID)
      }
    },
    {
      $group: {
        _id: {
          category: "$category"
        },
        totalAmt: { $sum: "$amt" } // no need for $toDouble
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id.category",
        totalAmt: 1
      }
    }
  ])

  
  console.log(expenses.length);

  return expenses

}



module.exports = { getTotalExpenseByUser, spendByCategory, monthTomonthTrend };

