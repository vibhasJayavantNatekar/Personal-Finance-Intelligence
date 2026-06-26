const { profitRule,

    lossRule,

    diversificationRule,

    bestPerformerRule

} = require("../Services/Insights/investment.rules");

const { getAllInvestmentAnalytics} = require("./investment.service");

const { getAllAllocation} = require("./investment.service")


const getInvestmentInsights = async (userID) => {

    const analytics = await getAllInvestmentAnalytics(userID)

    const allocation = await getAllAllocation(userID, "ALL")

    const insights = [

        profitRule(analytics),

        lossRule(analytics),

        diversificationRule(allocation),

        bestPerformerRule(analytics)

    ]

    return insights.filter(Boolean);

}

module.exports = {getInvestmentInsights}