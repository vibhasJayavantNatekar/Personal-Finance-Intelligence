import axios from "axios"
import API from "./axios"


export const createExpense = (expenseData, token) => {

    return API.post(
        "/expenses/api/v1",
        expenseData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

}

export const getExpenses = (token) => {

    return API.get(
        "/expenses/api/v1/",

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

}

export const updateExpenses = (id, expenseData, token) => {

    return API.put(
        `/expenses/api/v1/${id}`,
        expenseData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    )

}

export const deleteExpenses = (id, token) => {
    return API.delete(
        `/expenses/api/v1/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const getExpensesAllocation = (token, category, month, year) => {

    return API.get(
        "/api/v1/expensesallocation",
        {
            headers: {
                Authorization: `Bearer ${token}`

            },
            params: {
                category,
                month,
                year
            }
        }
    )
}

export const getExpensesAnalytics = (token, category, month, year) => {

    return API.get(
        "/api/v1/expensesanalytics",
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                category,
                month,
                year
            }
        }
    )

}

export const getExpensesInsights = (token) => {

    return API.get(
        "/api/v1/expensesInsights",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

}