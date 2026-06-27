const noExpenseRule = (analytics) => {

    if (analytics.totalExpense === 0) {

        return {
            type: "INFO",
            title: "No Expenses",
            message: "No expense records found."
        }

    }

    return null
}

const highExpenseRule = (analytics) => {

    if (analytics.totalExpense >= 50000) {

        return {
            type: "WARNING",
            title: "High Monthly Spending",
            message: "Your total monthly expenses are quite high."
        }

    }

    return null

}

const healthyExpenseRule = (analytics) => {

    if (
        analytics.totalExpense > 0 &&
        analytics.totalExpense < 50000
    ) {

        return {
            type: "SUCCESS",
            title: "Healthy Spending",
            message: "Your spending is within a reasonable range."
        }

    }

    return null

}

const savingsRule = (analytics) => {

    if (analytics.averageExpense < 1000) {

        return {
            type: "SUCCESS",
            title: "Controlled Spending",
            message: "Your average transaction amount is well controlled."
        }

    }

    return null

}

const essentialExpenseRule = (analytics) => {

    if (analytics.highestExpense) {

        return {
            type: "INFO",
            title: "Largest Expense",
            message: `Your highest expense was ₹${analytics.highestExpense.amt}.`
        };

    }

    return null;

}

const discretionaryExpenseRule = (analytics) => {

    if (analytics.transactionCount > 50) {

        return {
            type: "WARNING",
            title: "Frequent Spending",
            message: `You made ${analytics.transactionCount} expense transactions.`
        };

    }

    return null;

}

module.exports = {

    highExpenseRule,

    healthyExpenseRule,

    savingsRule,

    essentialExpenseRule,

    discretionaryExpenseRule,

    noExpenseRule

}