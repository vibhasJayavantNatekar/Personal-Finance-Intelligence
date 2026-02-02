const express = require('express')
const mongoose = require('mongoose')

const loanSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        loanType: {
            type: String,
            enum: ["Home",
                "Personal",
                "Education",
                "Car",
                "Business",
                "Gold",
                "Agriculture"],
            required: true
        },
        principleAmount: {
            type: Number,
            required: true,

        },
        interestRate: {
            type: Number,
            required: true
        },
        tenure: {
            type: Number,
            required: true
        },
        emi: {
            type: Number,
            required: true
        },
        startDate: {
            type: Date,
            default: Date.now(),
            required: true
        },
        loanStatus: {
            type: String,
            enum: ["ACTIVE", "CLOSED"],
            required: true
        }


    },
    {
         timestamps: true
    }
)




module.exports = mongoose.model('loan', loanSchema)

// userID

// loanType (Home, Personal, Education, etc.)

// principalAmount

// interestRate

// tenure (months)

// EMI

// startDate

// loanStatus (ACTIVE / CLOSED)