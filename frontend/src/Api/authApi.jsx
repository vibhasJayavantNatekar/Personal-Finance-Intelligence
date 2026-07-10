import API from "./axios"

export const registerUser = (userData) => {

    return API.post(
        "/auth/api/v1/register",
        userData
    )

}

export const loginUser = (userData) => {

    return API.post(
        "/auth/api/v1/login",
        userData
    )

}