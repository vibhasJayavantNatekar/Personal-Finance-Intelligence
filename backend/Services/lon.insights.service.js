const {getAllActiveAnalytics} = require('./loan.serice')
const {healthyEMIRule, emiWarningRule, highRiskRule, multipleLoanRule, singleLoanRule, noActiveLoanRule} = require('./Insights/loan.rules')
const getLoanInsights = async (userID) => {

    const analytics = await getAllActiveAnalytics(userID)

    const insights = [

        healthyEMIRule(analytics),

        emiWarningRule(analytics),

        highRiskRule(analytics),

        multipleLoanRule(analytics),

        singleLoanRule(analytics),

        noActiveLoanRule(analytics)

    ]

    return insights.filter(Boolean)

}

module.exports = {
    getLoanInsights
}