const { getLoanInsights } = require('../Services/lon.insights.service');
const { getInvestmentInsights } = require('../Services/investment.insight.service');
const { getExpenseInsights } = require('../Services/expenseInsight.service');

const getHealthInsights = async (userID) => {

    const [
        loanInsights,
        investmentInsights,
        expenseInsights
    ] = await Promise.all([

        getLoanInsights(userID),

        getInvestmentInsights(userID),

        getExpenseInsights(userID)

    ])

    const insights = [

        ...loanInsights,

        ...investmentInsights,

        ...expenseInsights

    ]

    return insights

}

module.exports = { getHealthInsights}