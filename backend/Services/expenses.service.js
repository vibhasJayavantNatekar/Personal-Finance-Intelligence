const Expenses = require('../Models/expense')
const express = require('express')
const mongoose = require('mongoose')

const buildExpenseMatch = (userID, category = "ALL", month = "ALL", year = "ALL") => {

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

const getAllExpenseAnalytics = async (userID, month = "ALL", year = "ALL") => {

  const match = buildExpenseMatch(userID, "ALL", month, year)

  console.log(match)

  const result = await Expenses.aggregate([

    {
      $match: match
    },

    {
      $facet: {

        summary: [

          {
            $group: {

              _id: null,

              totalExpense: {
                $sum: "$amt"
              },

              averageExpense: {
                $avg: "$amt"
              },

              transactionCount: {
                $sum: 1
              }

            }

          }

        ],

        highestExpense: [

          {
            $sort: {
              amt: -1
            }
          },

          {
            $limit: 1
          }

        ],

        lowestExpense: [

          {
            $sort: {
              amt: 1
            }
          },

          {
            $limit: 1
          }

        ]

      }

    }

  ])

  const summary = result[0]?.summary?.[0] || {};

  return {

    totalExpense:
      summary.totalExpense || 0,

    averageExpense:
      summary.averageExpense || 0,

    transactionCount:
      summary.transactionCount || 0,

    highestExpense:
      result[0]?.highestExpense?.[0] || null,

    lowestExpense:
      result[0]?.lowestExpense?.[0] || null

  }

}

const getCategoryExpenseAnalytics = async (userID, category, month = "ALL", year = "ALL") => {

  const match = buildExpenseMatch(userID, category, month, year)

  console.log("Expenses Analytics Category", match , "category" , category, month, year);

  const test = await Expenses.find(match);

  console.log(test);

  const result = await Expenses.aggregate([

    {
      $match: match
    },

    {
      $facet: {

        summary: [

          {
            $group: {

              _id: null,

              totalExpense: {
                $sum: "$amt"
              },

              averageExpense: {
                $avg: "$amt"
              },

              transactionCount: {
                $sum: 1
              }

            }

          }

        ],

        highestExpense: [

          {
            $sort: {
              amt: -1
            }
          },

          {
            $limit: 1
          }

        ],

        lowestExpense: [

          {
            $sort: {
              amt: 1
            }
          },

          {
            $limit: 1
          }

        ]

      }

    }

  ])

  const summary = result[0]?.summary?.[0] || {};

  return {

    totalExpense:
      summary.totalExpense || 0,

    averageExpense:
      summary.averageExpense || 0,

    transactionCount:
      summary.transactionCount || 0,

    highestExpense:
      result[0]?.highestExpense?.[0] || null,

    lowestExpense:
      result[0]?.lowestExpense?.[0] || null

  }

}

const getAllExpenseAllocation = async (userID, month = "ALL", year = "ALL") => {

  const match = buildExpenseMatch(userID, "ALL", month, year)

  console.log(match)
  const result = await Expenses.aggregate([

    {
      $match: match
    },

    {
      $group: {

        _id: "$category",

        totalAmount: {
          $sum: "$amt"
        }

      }

    },

    {
      $facet: {

        largestCategory: [

          {
            $sort: {
              totalAmount: -1
            }
          },

          {
            $limit: 1
          }

        ],

        smallestCategory: [

          {
            $sort: {
              totalAmount: 1
            }
          },

          {
            $limit: 1
          }

        ],

        summary: [

          {

            $group: {

              _id: null,

              totalCategories: {
                $sum: 1
              },

              totalExpense: {
                $sum: "$totalAmount"
              }

            }

          }

        ],

        chart: [

          {
            $sort: {
              totalAmount: -1
            }
          }

        ]

      }

    }

  ])

  const summary =
    result[0]?.summary?.[0] || {};

  const totalExpense =
    summary.totalExpense || 0;

  const chart =
    (result[0]?.chart || []).map(item => ({

      category: item._id,

      amount: item.totalAmount,

      percentage:
        totalExpense > 0

          ?

          Number(

            (
              item.totalAmount /
              totalExpense
            )
              .toFixed(4)

          ) * 100

          :

          0

    }))

  return {

    largestCategory:
      result[0]?.largestCategory?.[0] || null,

    smallestCategory:
      result[0]?.smallestCategory?.[0] || null,

    totalCategories:
      summary.totalCategories || 0,

    totalExpense,

    chart

  }

}

const getCategoryExpenseAllocation = async (
  userID,
  category,
  month = "ALL",
  year = "ALL"
) => {

  const match = buildExpenseMatch(
    userID,
    category,
    month,
    year
  )

  const result = await Expenses.aggregate([

    {
      $match: match
    },

    {
      $facet: {

        largestExpense: [

          {
            $sort: {
              amt: -1
            }
          },

          {
            $limit: 1
          }

        ],

        smallestExpense: [

          {
            $sort: {
              amt: 1
            }
          },

          {
            $limit: 1
          }

        ],

        summary: [

          {

            $group: {

              _id: null,

              totalTransactions: {
                $sum: 1
              },

              totalExpense: {
                $sum: "$amt"
              }

            }

          }

        ]

      }

    }

  ])

  const summary =
    result[0]?.summary?.[0] || {};

  return {

    largestExpense:
      result[0]?.largestExpense?.[0] || null,

    smallestExpense:
      result[0]?.smallestExpense?.[0] || null,

    totalTransactions:
      summary.totalTransactions || 0,

    totalExpense:
      summary.totalExpense || 0

  }

}

// _______________________
// 

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



module.exports = { getTotalExpenseByUser, spendByCategory, monthTomonthTrend, getAllExpenseAnalytics, getCategoryExpenseAnalytics, getAllExpenseAllocation, getCategoryExpenseAllocation };

