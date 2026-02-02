const express = require('express')
const mongoose = require('mongoose')

const date = new Date();

const InvestmentSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        assetType: {
            type: String,
            enum: ["STOCK", "MUTUAL_FUND", "ETF", "BOND", "FD", "GOLD"],
            required: true
        },
        assetName: {
            type: String,
            required: true

        },
        assetSymbol: {
            type: String,
            required: true

        },
        investedAmt: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        purchaseDate: {
            type: Date,
            default: Date.now()

        },
        investmentStatus: {
            type: String,
            enum: ["ACTIVE", "SOLD"],
            default: "ACTIVE"
        },
        sellDate: {
            type: Date,

        },
        sellAmount: {
            type: Number
        }

    },

    {
        timestamps: true
    }
)

InvestmentSchema.statics.ClosedInvestment = async function (userID, date, amt) {

    const sellDate = new Date(date.replace(/-/g, '/'));
    let updated
    try{
       await this.updateOne(
        { userID: userID } ,
        { $set:{sellDate:sellDate , sellAmount:amt ,investmentStatus:"SOLD"}})

        updated = await  this.findOne({userID});
    
    }catch(error){
        console.log(error.message);
        
    }

    return updated
  

}

module.exports = mongoose.model('investment', InvestmentSchema)

