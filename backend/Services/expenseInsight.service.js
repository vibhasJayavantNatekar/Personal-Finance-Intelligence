const { highExpenseRule, healthyExpenseRule, savingsRule, essentialExpenseRule, discretionaryExpenseRule, noExpenseRule } = require('../Services/Insights/expenses.rule')

const { getAllExpenseAnalytics } = require("./expenses.service")

const getExpenseInsights = async (userID) => {

    const analytics =
        await getAllExpenseAnalytics(userID);

    const insights = [

        highExpenseRule(analytics),

        healthyExpenseRule(analytics),

        savingsRule(analytics),

        essentialExpenseRule(analytics),

        discretionaryExpenseRule(analytics),

        noExpenseRule(analytics)

    ]

    return insights.filter(Boolean)

}

module.exports = {  getExpenseInsights }