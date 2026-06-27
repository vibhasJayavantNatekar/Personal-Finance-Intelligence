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

    let warningCount = 0;
    let successCount = 0;

    const recommendations = [];

    insights.forEach((item) => {

        if (
            item.type === "WARNING" ||
            item.type === "DANGER"
        ) {

            warningCount++;

        }

        if (item.type === "SUCCESS") {

            successCount++;

        }

        switch (item.title) {

            case "High EMI Burden":
                recommendations.push(
                    "Avoid taking new loans until your existing EMIs reduce."
                )
                break

            case "High Monthly Spending":
                recommendations.push(
                    "Reduce unnecessary monthly expenses."
                )
                break

            case "Large Expense":
                recommendations.push(
                    "Review your highest expense and check if it can be optimized."
                )
                break

            case "Good Investment Growth":
                recommendations.push(
                    "Continue your current investment strategy."
                )
                break

            case "No Expenses":
                recommendations.push(
                    "Start recording your expenses regularly."
                )
                break

            default:
                break
        }

    })

    let status = "Excellent"

    if (warningCount >= 4) {

        status = "Critical"

    }
    else if (warningCount >= 2) {

        status = "Needs Attention"

    }
    else if (warningCount === 1) {

        status = "Good"

    }
    else {

        status = "Excellent"

    }

    return {

        status,

        recommendations: [...new Set(recommendations)],

        insights

    }

}


module.exports = { getHealthInsights}