const express = require('express')
const mongoose = require('mongoose')
const Income = require('../Models/')

const monthTomonthExp = async (userID) => {

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
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$date"
                        }
                    }
                },

                totalAmt: {
                    $sum: "$amt"
                }
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
            $sort: {
                month: 1
            }
        }
    ])



}

const weekToweekExp = async (userID) => {
    const weeklyTrend = await Expenses.aggregate([
        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID)
            }
        },

        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    week: { $week: "$date" }
                },

                totalAmt: {
                    $sum: "$amt"
                }
            }
        },

        {
            $project: {
                _id: 0,

                year: "$_id.year",

                week: "$_id.week",

                totalAmt: 1
            }
        },

        {
            $sort: {
                year: 1,
                week: 1
            }
        }
    ])



}

const dayTodayExp = async (userID) => {



    const dailyTrend = await Expenses.aggregate([
        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID)
            }
        },

        {
            $group: {
                _id: {
                    day: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date"
                        }
                    }
                },

                totalAmt: {
                    $sum: "$amt"
                }
            }
        },

        {
            $project: {
                _id: 0,
                day: "$_id.day",
                totalAmt: 1
            }
        },

        {
            $sort: {
                day: 1
            }
        }
    ])

}

const yearToyearExp = async (userID) => {

    const yearlyTrend = await Expenses.aggregate([
        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID)
            }
        },

        {
            $group: {
                _id: {
                    year: {
                        $year: "$date"
                    }
                },

                totalAmt: {
                    $sum: "$amt"
                }
            }
        },

        {
            $project: {
                _id: 0,

                year: "$_id.year",

                totalAmt: 1
            }
        },

        {
            $sort: {
                year: 1
            }
        }
    ])



}

const monthTomonthIncome = async (userID) => {

    const monthlyIncome = await Income.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID)
            }
        },

        {
            $group: {
                _id: {
                    month: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$date"
                        }
                    }
                },

                totalIncome: {
                    $sum: "$amount"
                }
            }
        },

        {
            $project: {
                _id: 0,

                month: "$_id.month",

                totalIncome: 1
            }
        },

        {
            $sort: {
                month: 1
            }
        }

    ])


}

const weekToweekIncome = async (userID) => {


    const weeklyIncome = await Income.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID)
            }
        },

        {
            $group: {
                _id: {
                    year: { $year: "$date" },

                    week: { $week: "$date" }
                },

                totalIncome: {
                    $sum: "$amount"
                }
            }
        },

        {
            $project: {
                _id: 0,

                year: "$_id.year",

                week: "$_id.week",

                totalIncome: 1
            }
        },

        {
            $sort: {
                year: 1,
                week: 1
            }
        }

    ])

}

const dayTodayIncome = async (userID) => {

    const dailyIncome = await Income.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID)
            }
        },

        {
            $group: {
                _id: {
                    day: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date"
                        }
                    }
                },

                totalIncome: {
                    $sum: "$amount"
                }
            }
        },

        {
            $project: {
                _id: 0,

                day: "$_id.day",

                totalIncome: 1
            }
        },

        {
            $sort: {
                day: 1
            }
        }

    ])

}

const yearToyearIncome = async (userID) => {

    const yearlyIncome = await Income.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID)
            }
        },

        {
            $group: {
                _id: {
                    year: {
                        $year: "$date"
                    }
                },

                totalIncome: {
                    $sum: "$amount"
                }
            }
        },

        {
            $project: {
                _id: 0,

                year: "$_id.year",

                totalIncome: 1
            }
        },

        {
            $sort: {
                year: 1
            }
        }

    ])

}



const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
)

const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
)

const startOfYear = new Date(
    new Date().getFullYear(),
    0,
    1
)

const endOfYear = new Date(
    new Date().getFullYear() + 1,
    0,
    1
)

const today = new Date()

const firstDayOfWeek = new Date(today)

firstDayOfWeek.setDate(
    today.getDate() - today.getDay()
)

firstDayOfWeek.setHours(0, 0, 0, 0)

const lastDayOfWeek = new Date(firstDayOfWeek)

lastDayOfWeek.setDate(
    firstDayOfWeek.getDate() + 7
)

const startOfDay = new Date()

startOfDay.setHours(0, 0, 0, 0)

const endOfDay = new Date()

endOfDay.setHours(23, 59, 59, 999)

const yearlyExp = async (userID) => {

    const yearlyExpense = await Expenses.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: startOfYear,
                    $lt: endOfYear
                }
            }
        },

        {
            $group: {
                _id: null,

                totalExpense: {
                    $sum: "$amt"
                }
            }
        }

    ])

    const currentYearLabel =
        new Date().getFullYear()

    const res = {

        label: currentYearLabel,

        totalExpense:
            yearlyExpense[0]?.totalExpense || 0

    }

    return res


}

const yearlyIncome = async (userID) => {

    const yearlyIncome = await Income.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: startOfYear,
                    $lt: endOfYear
                }
            }
        },

        {
            $group: {
                _id: null,

                totalIncome: {
                    $sum: "$amount"
                }
            }
        }

    ])

    const currentYearLabel =
        new Date().getFullYear()

    const res = {

        label: currentYearLabel,

        totalIncome:
            yearlyIncome[0]?.totalIncome || 0

    }

    return res

}

const monthlyExp = async (userID) => {

    const monthlySummary = await Expenses.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            }
        },

        {
            $group: {
                _id: null,

                totalExpense: {
                    $sum: "$amt"
                }
            }
        }

    ])

    const currentMonthLabel = new Date().toLocaleString(
        'default',
        {
            month: 'long',
            year: 'numeric'
        }
    )

    const res = {
        label: currentMonthLabel,
        totalExpense:
            monthlySummary[0]?.totalExpense || 0
    }

    return res

}
const monthlyIncome = async (userID) => {


    const monthlyIncome = await Income.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            }
        },

        {
            $group: {
                _id: null,

                totalIncome: {
                    $sum: "$amount"
                }
            }
        }

    ])

    const currentMonthLabel = new Date().toLocaleString(
        'default',
        {
            month: 'long',
            year: 'numeric'
        }
    )

    const res = {

        label: currentMonthLabel,

        totalIncome:
            monthlyIncome[0]?.totalIncome || 0

    }

    return res

}

const weeklyExp = async (userID) => {


    const weeklySummary = await Expenses.aggregate([

        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: firstDayOfWeek,
                    $lt: lastDayOfWeek
                }
            }
        },

        {
            $group: {
                _id: null,

                totalExpense: {
                    $sum: "$amt"
                }
            }
        }

    ])

    const options = {
        day: 'numeric',
        month: 'short'
    }

    const weekLabel =
        `${firstDayOfWeek.toLocaleDateString('en-IN', options)}
 - 
${lastDayOfWeek.toLocaleDateString('en-IN', options)}`

    const res = {
        label: weekLabel,
        totalExpense:
            weeklySummary[0]?.totalExpense || 0
    }

    return res
}
const weeklyIncome = async (userID) => {


    const weeklyIncome = await Income.aggregate([

        {
            $match: {

                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: firstDayOfWeek,
                    $lt: lastDayOfWeek
                }

            }
        },

        {
            $group: {

                _id: null,

                totalIncome: {
                    $sum: "$amount"
                }

            }
        }

    ])

    const options = {
        day: 'numeric',
        month: 'short'
    }

    const weekLabel =
        `${firstDayOfWeek.toLocaleDateString('en-IN', options)}
 - 
${lastDayOfWeek.toLocaleDateString('en-IN', options)}`

    const res = {

        label: weekLabel,

        totalIncome:
            weeklyIncome[0]?.totalIncome || 0

    }

    return res

}
const dayExp = async (userID) => {

    const todayExpense = await Expenses.aggregate([

        {
            $match: {

                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }

            }
        },

        {
            $group: {

                _id: null,

                totalExpense: {
                    $sum: "$amt"
                }

            }
        }

    ])

    const todayLabel = new Date().toLocaleDateString(
        'en-IN',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
    )

    const res = {

        label: todayLabel,

        totalExpense:
            todayExpense[0]?.totalExpense || 0

    }

}
const dayIncome = async (userID) => {

    const todayIncome = await Income.aggregate([

        {
            $match: {

                userID: new mongoose.Types.ObjectId(userID),

                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }

            }
        },

        {
            $group: {

                _id: null,

                totalIncome: {
                    $sum: "$amount"
                }

            }
        }

    ])

    const todayLabel = new Date().toLocaleDateString(
        'en-IN',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
    )

    const res = {

        label: todayLabel,

        totalIncome:
            todayIncome[0]?.totalIncome || 0

    }

    return res

}


module.exports = { yearlyExp, yearlyIncome, monthlyExp, monthlyIncome, dayExp, dayIncome, yearToyearExp, yearToyearIncome, monthTomonthExp, monthTomonthIncome, weekToweekExp, weekToweekIncome, dayTodayExp, dayTodayIncome }