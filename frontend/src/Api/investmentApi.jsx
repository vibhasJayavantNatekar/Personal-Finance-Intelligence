import API from './axios'

export const createInvestment = (InvestmentData , token) =>{
  return  API.post(
    "/investment/api/v1/",
    InvestmentData,
    {
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    )
}

export const getInvestment = (token)=> {
    
    return API.get(
        "/investment/api/v1/",
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }
    )

}

export const updateInvestment = (id, InvestmentData, token)=> {
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