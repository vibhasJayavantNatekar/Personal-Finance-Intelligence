const express = require('express')
const mongoose = require('mongoose')
const Loan = require('../Models/loan')

//create loan

const create = async (req ,res)=>{
    const {userID , loanType , principleAmount  ,  interestRate ,  tenure ,  emi ,   startDate , loanStatus} = req.body

    try {
        const loan = await Loan.create({userID , loanType , principleAmount , interestRate , tenure , emi, startDate , loanStatus})
        res.status(200).json(loan)
    } catch (error) {
        res.status(500).json(error.message)
    }

}


// get Loans

const getLoans = async (req , res)=>{


   try {
    const loans = await Loan.find()
    res.status(200).json({loans})
   } catch (error) {
    res.status(500).json(error.message)
   }

}

//get Loan by id

const getLoanbyId = async (req , res)=>{

    const {id} = req.params

    try {
        const loan = await Loan.findById({id})
        res.status(200).json({loan})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//update loan 

const updateLoan = async (req , res)=>{

   const{id} = req.params;
   const {userID , loanType , principleAmount  ,  interestRate ,  tenure ,  emi ,   startDate , loanStatus} = req.body;

   try {
    const updatedLoan = await Loan.findByIdAndUpdate({id},{userID,loanType,principleAmount,interestRate,tenure,emi,startDate,loanStatus})
    res.statua(200).json({updateLoan})
   } catch (error) {

    res.statua(500).json(error)
    
   }


}

//delete loan

const deleteLoan = async (req , res)=>{
    res.statua(200).json("Delete")
}

module.exports = {create , getLoans , getLoanbyId , updateLoan , deleteLoan }

// {
//         userID : {
//             type : mongoose.Schema.Types.ObjectId,
//             ref:'user'
//         },
//         loanType :{
//             type:String,
//             enum:["Home","Personal","Education"],
//             required:true
//         },
//         principleAmount :{
//             type:Number,
//             required:true,
            
//         },
//         interestRate:{
//             type:Number,
//             required:true
//         },
//         tenure:{
//             type:Number,
//             required:true
//         },
//         emi:{
//             type :Number,
//             required:true
//         },
//         startDate :{
//             type:Date,
//             default:Date.now(),
//             required:true
//         }


//     }