import API from './axios'

export const createInvestment = (InvestmentData, token) => {
    return API.post(
        "/investment/api/v1/",
        InvestmentData,
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }

    )
}

export const getInvestment = (token) => {

    return API.get(
        "/investment/api/v1/",
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }
    )

}

export const updateInvestment = (id, InvestmentData, token) => {
    return API.put(
        `/investment/api/v1/${id}`,
        InvestmentData,
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }
    )
}

export const deleteInvestment = (id, token) => {
    return API.delete(
        `/investment/api/v1/${id}`,
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }
    )
}

export const getInvestmentAnalytics = (token, type, status) => {

    return API.get(
        `/api/v1/investmentAnalytics`,
        {
            headers: {
                Authorization: `bearer ${token}`
            },
            params: {
                type,
                status
            }
        }
    )

}

export const getInvestmentAllocation = (token, type, status) => {

    return API.get(
        `/api/v1/investmentAllocation`,
        {
            headers: {
                Authorization: `bearer ${token}`
            },
            params: {
                type,
                status
            }
        }
    )

}

export const getPerformanceListAnalytics = (token, type, status) => {

    return API.get(
        `/api/v1/investmentPerformance`,
        {
            headers: {
                Authorization: `bearer ${token}`
            },
            params: {
                type,
                status
            }
        }
    )

}

export const getInsights = (token) => {
    return API.get(
        "/api/v1/investmentInsights",
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }
    )
}

// export const getStocksHoldings = (token) =>{

//     return API.get(
//         `/investment/api/v1/stocksholdings`,
//         {
//             headers: {
//                 Authorization: `bearer ${token}`
//             }

//         }
//     )

// }


export const getStocksHoldings = (token) => {

    return API.get(
        `/api/v1/stockHoldings`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

}

export const getHoldingCount = (token) => {
    return API.get(
        `http://localhost:5000/api/v1/holding`,
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }
    )
}


"/api/v1/investmentInsights"
