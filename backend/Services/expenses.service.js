const Expenses = require('../Models/expense')
const express = require('express')
const mongoose = require('mongoose')

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
        totalExpenses: { $sum: { $toDouble: "$amt" } }
      }
    }
  ])

  console.log(expenses.totalExpenses);
  



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

  const expenses =
    await Expenses.aggregate([
      {
        $group: {
          _id: {
            userID:  new mongoose.Types.ObjectId(userID),
            category: '$category'
          },
          totalAmt: { $sum: { $toDouble: "$amt" } }
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

