import API from './axios'

export const getLoans = async (token) => {

    return API.get(
        "/loan/api/v1/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

}

export const createLoan = async (loanData, token) =>{
    
    return API.post(
        "/loan/api/v1/",
         loanData,
         {
            headers: {
                Authorization: `Bearer ${token}`
            }
         }
    )
}

export const updateLoan = async (id, loanData, token) =>{

    return API.put(
        `/loan/api/v1/${id}`,
        loanData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

}

export const deleteLoan = async (id, loanData, token) =>{

    return API.delete(
        `/loan/api/v1/${id}`,
        loanData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

}

export const getLoanAnalytics  = (token, type, status)=> {

    

    return API.get(
        `/api/v1/loanAnalytics`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                type,
                status
            }
        }

    )

}