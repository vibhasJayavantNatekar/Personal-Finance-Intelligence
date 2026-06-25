const {getAllInvestmentAnalytics} = require("../investment.service")

const profitRule = (analytics) => {

    if (analytics.totalProfit > 0) {

        return {

            type: "SUCCESS",

            title: "Portfolio in Profit",

            message: `Your investments are up by ₹${analytics.totalProfit}.`

        }
    }

    return null

}

const lossRule = (analytics) => {

    if (analytics.totalProfit < 0) {

        return {

            type: "DANGER",

            title: "Portfolio in Loss",

            message: `Your investments are down by ₹${Math.abs(analytics.totalProfit)}.`

        }

    }

    return null

}


const diversificationRule = (allocation) => {

    if (allocation.largestAllocation.percentage > 60) {

        return {

            type: "WARNING",

            title: "Highly Concentrated Portfolio",

            message: "More than 60% of your investment is in one asset class."

        }

    }

    return {

        type: "SUCCESS",

        title: "Well Diversified",

        message: "Your investments are spread across multiple asset classes."

    }

}

const bestPerformerRule = (analytics) => {

    if (!analytics.bestPerformer)

        return null

    return {

        type: "INFO",

        title: "Best Performing Asset",

        message: `${analytics.bestPerformer.assetName} is your highest-performing investment.`

    }

}

module.exports = {

    profitRule,

    lossRule,

    diversificationRule,

    bestPerformerRule

}

