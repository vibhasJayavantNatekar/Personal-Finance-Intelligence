import axios from "axios"
import API  from "./axios"


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

export const getExpenses = ( token) => {

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