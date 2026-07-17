import API  from '../Api/axios'

export const getHealthInsights = (token) =>{

    return API.get(
        `/health/api/v1/health-insights`,
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        }
    )

}