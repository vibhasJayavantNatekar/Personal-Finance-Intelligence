const express = require('express')
const Investment = require('../Models/investment')
const mongoose = require('mongoose')
const axios = require('axios')
require("dotenv/config")

const buildInvestmentMatch = (userID, type = "ALL", status = "ALL") => {

    const match = {
        userID:
            new mongoose.Types.ObjectId(
                userID
            )
    };

    if (type !== "ALL") {
        match.assetType = type
    }

    if (status !== "ALL") {
        match.investmentStatus = status
    }

    return match;
}

const getAllInvestmentAnalytics = async (userID, status) => {

    const match = buildInvestmentMatch(userID, "ALL", status)

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {

                currentValue: {
                    $multiply: ["$investedAmt", 1.15]
                }

            }
        },

        {
            $addFields: {

                profit: {
                    $subtract: [
                        "$currentValue",
                        "$investedAmt"
                    ]
                }

            }
        },

        {
            $facet: {

                summary: [

                    {
                        $group: {

                            _id: null,

                            totalInvestment: {
                                $sum: "$investedAmt"
                            },

                            currentValue: {
                                $sum: "$currentValue"
                            },

                            totalProfit: {
                                $sum: "$profit"
                            }

                        }
                    }

                ],

                bestPerformer: [

                    {
                        $sort: {
                            profit: -1
                        }
                    },

                    {
                        $limit: 1
                    },

                    {
                        $project: {

                            _id: 0,

                            assetName: 1,

                            assetSymbol: 1,

                            investedAmt: 1,

                            currentValue: 1,

                            profit: 1

                        }
                    }

                ]

            }

        }

    ])

    const summary = result[0]?.summary?.[0] || {
        totalInvestment: 0,
        currentValue: 0,
        totalProfit: 0
    }

    const bestPerformer =
        result[0]?.bestPerformer?.[0] || null;

    return {

        totalInvestment:
            summary.totalInvestment,

        currentValue:
            summary.currentValue,

        totalProfit:
            summary.totalProfit,

        bestPerformer

    }

}

const getAllSoldInvestmentAnalytics = async (userID) => {

    const match = buildInvestmentMatch(userID, "ALL", "SOLD")

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {

                currentValue: "$sellAmount",

                profit: {
                    $subtract: [
                        "$sellAmount",
                        "$investedAmt"
                    ]
                }

            }
        },

        {
            $facet: {

                summary: [

                    {
                        $group: {

                            _id: null,

                            totalSoldInvestments: {
                                $sum: 1
                            },

                            saleValue: {
                                $sum: "$sellAmount"
                            },

                            realizedProfit: {
                                $sum: "$profit"
                            }

                        }
                    }

                ],

                bestExit: [

                    {
                        $sort: {
                            profit: -1
                        }
                    },

                    {
                        $limit: 1
                    },

                    {
                        $project: {

                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            profit: 1

                        }
                    }

                ]

            }

        }

    ]);

    const summary = result[0]?.summary?.[0] || {};

    return {

        totalSoldInvestments:
            summary.totalSoldInvestments || 0,

        saleValue:
            summary.saleValue || 0,

        realizedProfit:
            summary.realizedProfit || 0,

        bestExit:
            result[0]?.bestExit?.[0] || null

    }

}

const getInvestmentTypeAnalytics = async (userID, assetType, status) => {

    const match = buildInvestmentMatch(
        userID,
        assetType,
        status
    );

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {

                currentValue: {
                    $multiply: [
                        "$investedAmt",
                        1.15
                    ]
                }

            }
        },

        {
            $addFields: {

                profit: {
                    $subtract: [
                        "$currentValue",
                        "$investedAmt"
                    ]
                }

            }
        },

        {
            $facet: {

                summary: [

                    {

                        $group: {

                            _id: null,

                            totalInvestment: {
                                $sum: "$investedAmt"
                            },

                            currentValue: {
                                $sum: "$currentValue"
                            },

                            totalProfit: {
                                $sum: "$profit"
                            },

                            totalAssets: {
                                $sum: 1
                            }

                        }

                    }

                ],

                bestAsset: [

                    {
                        $sort: {
                            profit: -1
                        }
                    },

                    {
                        $limit: 1
                    },

                    {
                        $project: {

                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            currentValue: 1,
                            profit: 1

                        }
                    }

                ]

            }

        }

    ]);

    const summary = result[0]?.summary?.[0] || {}

    return {

        totalAssets:
            summary.totalAssets || 0,

        totalInvestment:
            summary.totalInvestment || 0,

        currentValue:
            summary.currentValue || 0,

        totalProfit:
            summary.totalProfit || 0,

        bestAsset:
            result[0]?.bestAsset?.[0] || null

    }

}

const getInvestmentTypeSoldAnalytics = async (userID, assetType) => {

    const match = buildInvestmentMatch(
        userID,
        assetType,
        "SOLD"
    )

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {

                profit: {

                    $subtract: [

                        "$sellAmount",

                        "$investedAmt"

                    ]

                }

            }

        },

        {

            $facet: {

                summary: [

                    {

                        $group: {

                            _id: null,

                            totalSoldAssets: {

                                $sum: 1

                            },

                            saleValue: {

                                $sum: "$sellAmount"

                            },

                            realizedProfit: {

                                $sum: "$profit"

                            }

                        }

                    }

                ],

                bestExit: [

                    {

                        $sort: {

                            profit: -1

                        }

                    },

                    {

                        $limit: 1

                    },

                    {

                        $project: {

                            _id: 0,

                            assetName: 1,

                            assetSymbol: 1,

                            profit: 1

                        }

                    }

                ]

            }

        }

    ])

    const summary = result[0]?.summary?.[0] || {}

    return {

        totalSoldAssets:
            summary.totalSoldAssets || 0,

        saleValue:
            summary.saleValue || 0,

        realizedProfit:
            summary.realizedProfit || 0,

        bestExit:
            result[0]?.bestExit?.[0] || null

    }

}

const getAllPerformance = async (userID, status) => {

    const match = buildInvestmentMatch(userID, "ALL", status)

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {

                currentValue: {
                    $multiply: [
                        "$investedAmt",
                        1.15
                    ]
                }

            }
        },

        {
            $addFields: {

                profit: {

                    $subtract: [
                        "$currentValue",
                        "$investedAmt"
                    ]

                }

            }
        },

        {
            $facet: {

                mostRecentInvestment: [

                    {
                        $sort: {
                            purchaseDate: -1
                        }
                    },

                    {
                        $limit: 1
                    },

                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            purchaseDate: 1
                        }
                    }

                ],

                highestInvestment: [

                    {
                        $sort: {
                            investedAmt: -1
                        }
                    },

                    {
                        $limit: 1
                    },

                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            investedAmt: 1
                        }
                    }

                ],

                topGainer: [

                    {
                        $sort: {
                            profit: -1
                        }
                    },

                    {
                        $limit: 1
                    },

                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            profit: 1
                        }
                    }

                ],

                topLoser: [

                    {
                        $sort: {
                            profit: 1
                        }
                    },

                    {
                        $limit: 1
                    },

                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            profit: 1
                        }
                    }

                ]

            }

        }

    ]);

    return {

        mostRecentInvestment:
            result[0]?.mostRecentInvestment?.[0] || null,

        highestInvestment:
            result[0]?.highestInvestment?.[0] || null,

        topGainer:
            result[0]?.topGainer?.[0] || null,

        topLoser:
            result[0]?.topLoser?.[0] || null

    }

}

const getTypePerformance = async (userID, type, status) => {

    const match = buildInvestmentMatch(userID, type, status)

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {
                currentValue: {
                    $multiply: ["$investedAmt", 1.15]
                }
            }
        },

        {
            $addFields: {
                profit: {
                    $subtract: [
                        "$currentValue",
                        "$investedAmt"
                    ]
                }
            }
        },

        {
            $facet: {

                mostRecentInvestment: [
                    { $sort: { purchaseDate: -1 } },
                    { $limit: 1 },
                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1
                        }
                    }
                ],

                highestInvestment: [
                    { $sort: { investedAmt: -1 } },
                    { $limit: 1 },
                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            investedAmt: 1
                        }
                    }
                ],

                topGainer: [
                    { $sort: { profit: -1 } },
                    { $limit: 1 },
                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            profit: 1
                        }
                    }
                ],

                topLoser: [
                    { $sort: { profit: 1 } },
                    { $limit: 1 },
                    {
                        $project: {
                            _id: 0,
                            assetName: 1,
                            assetSymbol: 1,
                            profit: 1
                        }
                    }
                ]

            }
        }

    ])

    return {

        mostRecentInvestment:
            result[0]?.mostRecentInvestment?.[0] || null,

        highestInvestment:
            result[0]?.highestInvestment?.[0] || null,

        topGainer:
            result[0]?.topGainer?.[0] || null,

        topLoser:
            result[0]?.topLoser?.[0] || null

    }

}

const getAllSoldPerformance = async (userID) => {

    const match = buildInvestmentMatch(userID, "ALL", "SOLD")

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {

                profit: {
                    $subtract: [
                        "$sellAmount",
                        "$investedAmt"
                    ]
                }

            }
        },

        {
            $facet: {

                mostRecentSale: [
                    { $sort: { sellDate: -1 } },
                    { $limit: 1 }
                ],

                highestSale: [
                    { $sort: { sellAmount: -1 } },
                    { $limit: 1 }
                ],

                lowestSale: [
                    { $sort: { sellAmount: 1 } },
                    { $limit: 1 }
                ],

                bestExit: [
                    { $sort: { profit: -1 } },
                    { $limit: 1 }
                ]

            }

        }

    ])

    return {

        mostRecentSale:
            result[0]?.mostRecentSale?.[0] || null,

        highestSale:
            result[0]?.highestSale?.[0] || null,

        lowestSale:
            result[0]?.lowestSale?.[0] || null,

        bestExit:
            result[0]?.bestExit?.[0] || null

    }

}


const getTypeSoldPerformance = async (userID, type) => {

    const match = buildInvestmentMatch(userID, type, "SOLD")

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $addFields: {

                profit: {
                    $subtract: [
                        "$sellAmount",
                        "$investedAmt"
                    ]
                }

            }
        },

        {
            $facet: {

                mostRecentSale: [
                    { $sort: { sellDate: -1 } },
                    { $limit: 1 }
                ],

                highestSale: [
                    { $sort: { sellAmount: -1 } },
                    { $limit: 1 }
                ],

                lowestSale: [
                    { $sort: { sellAmount: 1 } },
                    { $limit: 1 }
                ],

                bestExit: [
                    { $sort: { profit: -1 } },
                    { $limit: 1 }
                ]

            }

        }

    ])

    return {

        mostRecentSale:
            result[0]?.mostRecentSale?.[0] || null,

        highestSale:
            result[0]?.highestSale?.[0] || null,

        lowestSale:
            result[0]?.lowestSale?.[0] || null,

        bestExit:
            result[0]?.bestExit?.[0] || null

    }

}

const getAllAllocation = async (userID, status) => {

    const match = buildInvestmentMatch(userID, "ALL", status)

    const result = await Investment.aggregate([
        {
            $match: match
        },


        {
            $group: {
                _id: "$assetType",

                totalAmount: {
                    $sum: "$investedAmt"
                }
            }
        },


        {
            $group: {
                _id: null,

                totalPortfolio: {
                    $sum: "$totalAmount"
                },

                assets: {
                    $push: {
                        category: "$_id",
                        amount: "$totalAmount"
                    }
                }
            }
        },

        {
            $unwind: "$assets"
        },

        {
            $addFields: {

                "assets.percentage": {

                    $round: [
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        "$assets.amount",
                                        "$totalPortfolio"
                                    ]
                                },
                                100
                            ]
                        },
                        2
                    ]

                }

            }
        },

        {
            $replaceRoot: {
                newRoot: "$assets"
            }
        },

        {
            $facet: {

                largestAllocation: [

                    {
                        $sort: {
                            amount: -1
                        }
                    },

                    {
                        $limit: 1
                    }

                ],

                smallestAllocation: [

                    {
                        $sort: {
                            amount: 1
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

                            assetClasses: {
                                $sum: 1
                            },

                            portfolioValue: {
                                $sum: "$amount"
                            }

                        }
                    }

                ],

                chart: [

                    {
                        $project: {

                            _id: 0,

                            category: "$category",

                            amount: "$amount",

                            percentage: "$percentage"

                        }
                    }

                ]

            }

        }

    ])

    const summary = result[0]?.summary?.[0] || {}

    return {

        largestAllocation:
            result[0]?.largestAllocation?.[0] || null,

        smallestAllocation:
            result[0]?.smallestAllocation?.[0] || null,

        assetClasses:
            summary.assetClasses || 0,

        portfolioValue:
            summary.portfolioValue || 0,

        chart:
            result[0]?.chart || []

    }

    console.log(result[0]?.chart);


}

const getTypeAllocation = async (userID, assetType, status) => {

    const match = buildInvestmentMatch(userID, assetType, status)

    const result = await Investment.aggregate([

        {
            $match: match
        },

        {
            $group: {

                _id: "$assetName",

                totalAmount: {
                    $sum: "$investedAmt"
                }

            }
        },

        {
            $group: {

                _id: null,

                totalPortfolio: {
                    $sum: "$totalAmount"
                },

                assets: {
                    $push: {

                        category: "$_id",

                        amount: "$totalAmount"

                    }
                }

            }
        },

        {
            $unwind: "$assets"
        },

        {
            $addFields: {

                "assets.percentage": {

                    $round: [

                        {

                            $multiply: [

                                {

                                    $divide: [

                                        "$assets.amount",
                                        "$totalPortfolio"

                                    ]

                                },

                                100

                            ]

                        },

                        2

                    ]

                }

            }

        },

        {
            $replaceRoot: {

                newRoot: "$assets"

            }

        },

        {
            $facet: {

                largestHolding: [

                    {

                        $sort: {

                            amount: -1

                        }

                    },

                    {

                        $limit: 1

                    }

                ],

                smallestHolding: [

                    {

                        $sort: {

                            amount: 1

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

                            totalHoldings: {

                                $sum: 1

                            },

                            totalValue: {

                                $sum: "$amount"

                            }

                        }

                    }

                ],

                chart: [

                    {

                        $project: {

                            _id: 0,

                            category: "$category",

                            amount: "$amount",

                            percentage: "$percentage"

                        }

                    }

                ]

            }

        }

    ])

    const summary = result[0]?.summary?.[0] || {};

    return {

        largestHolding:
            result[0]?.largestHolding?.[0] || null,

        smallestHolding:
            result[0]?.smallestHolding?.[0] || null,

        totalHoldings:
            summary.totalHoldings || 0,

        totalValue:
            summary.totalValue || 0,

        chart:
            result[0]?.chart || []

    }

}

const getHoldingCounts = async (userID) => {

    const result = await Investment.aggregate([
        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID),
                investmentStatus: "ACTIVE"
            }
        },
        {
            $group: {
                _id: "$assetType",
                holdings: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                assetType: "$_id",
                holdings: 1
            }
        }
    ])


    return result


}

// [
//     {
//         assetSymbol: "INFY",
//         assetName: "Infosys",
//         quantity: 10,
//         investedAmt: 10000
//     }
// ]

const getStockPrice = async (symbol) => {

     //const API_KEY = process.env.STOCK_MARKET_API

    try {
        const response = await axios.get(
            "https://stock.indianapi.in/stock",
            {
                headers: {
                    "x-api-key": API_KEY,
                    "accept": "application/json"
                },

                params: {
                    name: symbol
                }
            }
        )

     
        return {
            currentPrice: Number(response.data.currentPrice.NSE) || 0,
            percentChange: Number(response.data.percentChange) || 0
        }

    } catch (error) {
       
        console.log(
            symbol,
            error.response?.data || error.message
        )
        return {
             currentPrice:  0,
            percentChange:  0
        }

    }



}

const getStockHoldings = async (userID) => {


    const stocks = await Investment.find({ userID, assetType: "STOCK", investmentStatus: "ACTIVE" }).select("assetSymbol assetName quantity investedAmt")

    const stock_names = []

    stocks.map((stock) => {
        stock_names.push(stock.assetSymbol)

    })
    console.log(stock_names);

    const stocksHoldings = await Promise.all(

        stocks.map(async (stock) => {
            const stockData = await getStockPrice(stock.assetSymbol)

            return {
                assetSymbol: stock.assetSymbol,
                assetName: stock.assetName,
                quantity: stock.quantity,
                 currentPrice: stockData.currentPrice,
                percentChange: stockData.percentChange,

                holdingValue: stock.quantity * stockData.currentPrice

            }
        })
    )

    // const price = await getStockPrice("TCS") || 0 
    // const price = 0

    console.log(stocksHoldings)


    return stocksHoldings

}

module.exports = { getAllInvestmentAnalytics, getAllSoldInvestmentAnalytics, getInvestmentTypeAnalytics, getInvestmentTypeSoldAnalytics, getAllPerformance, getTypePerformance, getAllSoldPerformance, getTypeSoldPerformance, getAllAllocation, getTypeAllocation, getHoldingCounts, getStockHoldings }