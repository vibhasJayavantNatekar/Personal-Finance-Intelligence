const healthyEMIRule = (analytics) => {

    if (analytics.totalEMIBurden <= 20) {

        return {
            type: "SUCCESS",
            title: "Healthy EMI Ratio",
            message: "Your EMI burden is well within the recommended limit."
        }

    }

    return null

}

const emiWarningRule = (analytics) => {

    if (
        analytics.totalEMIBurden > 20 &&
        analytics.totalEMIBurden < 40
    ) {

        return {
            type: "WARNING",
            title: "Moderate EMI Burden",
            message: "Your EMI burden is increasing. Avoid taking unnecessary loans."
        }

    }

    return null
}

const highRiskRule = (analytics) => {

    if (analytics.totalEMIBurden >= 40) {

        return {

            type: "DANGER",

            title: "High EMI Burden",

            message: "A large part of your income goes toward EMI payments."

        }

    }

    return null

}

const multipleLoanRule = (analytics) => {

    if (analytics.activeLoans >= 3) {

        return {

            type: "INFO",

            title: "Multiple Active Loans",

            message: `You currently have ${analytics.activeLoans} active loans.`

        }

    }

    return null

}

const singleLoanRule = (analytics) => {

    if (analytics.activeLoans === 1) {

        return {

            type: "SUCCESS",

            title: "Simple Loan Portfolio",

            message: "You have only one active loan, making repayment easier."

        }

    }

    return null
}

const noActiveLoanRule = (analytics) => {

    if (analytics.activeLoans === 0) {

        return {

            type: "SUCCESS",

            title: "Debt Free",

            message: "Congratulations! You have no active loans."

        }

    }

    return null

}

module.exports = {

    healthyEMIRule,

    emiWarningRule,

    highRiskRule,

    multipleLoanRule,

    singleLoanRule,

    noActiveLoanRule

}