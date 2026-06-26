const { highExpenseRule, healthyExpenseRule, savingsRule, essentialExpenseRule, discretionaryExpenseRule, noExpenseRule} = require("./rules/expense.rules");

const {
    getExpenseAnalytics
} = require("../expenseAnalytics.service");

const getExpenseInsights = async (userID) => {

    const analytics = await getExpenseAnalytics(userID)

    const insights = [

        highExpenseRule(analytics),

        healthyExpenseRule(analytics),

        savingsRule(analytics),

        essentialExpenseRule(analytics),

        discretionaryExpenseRule(analytics),

        noExpenseRule(analytics)

    ]

    return insights.filter(Boolean);

}

module.exports = { getExpenseInsights}