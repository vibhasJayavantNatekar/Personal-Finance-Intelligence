const express = require('express')

const apiResponse = (
    success,
    message,
    data = null,
    errors = null
) => {

    return {
        success,
        message,
        data,
        errors
    }

}

module.exports = apiResponse;