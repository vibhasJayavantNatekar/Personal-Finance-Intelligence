const express = require('express')
const mongoose = require('mongoose')
const Loan = require('../Models/loan')
const User = require('../Models/userModel')
const {getLoanFullSummary} = require('../Services/loan.serice')

//create loan

const create = async (req ,res)=>{
    const {userID , loanType , principleAmount  ,  interestRate ,  tenure ,  emi ,   startDate , loanStatus} = req.body
        

    try {
            
        const userExist = await   User.findById(userID)

        if(!userExist){
            res.status(500).json("User not exist")
        }

        const loan = await Loan.create({userID , loanType , principleAmount , interestRate , tenure , emi, startDate , loanStatus})
        res.status(200).json(loan)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

// get Loans

const getLoans = async (req , res)=>{


   try {
    const loans = await Loan.find().populate('userID')
    res.status(200).json({loans})
   } catch (error) {
    res.status(500).json(error.message)
   }

}

//get Loan by id

const getLoanbyId = async (req , res)=>{

    const {id} = req.params

    try {
        const loan = await Loan.findById(id)
        res.status(200).json({loan})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//get Loan by user ID

const getLoansByuserID = async (req , res)=>{
    const {userID} = req.params

    try {
        const loans = await Loan.find({userID})
        res.status(200).json({loans})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//update loan 

const updateLoan = async (req , res)=>{

   const{id} = req.params;
   const {loanType , principleAmount  ,  interestRate ,  tenure ,  emi ,   startDate , loanStatus} = req.body;

   try {
    const updatedLoan = await Loan.findByIdAndUpdate(id,{loanType,principleAmount,interestRate,tenure,emi,startDate,loanStatus})
    res.status(200).json({updatedLoan})
   } catch (error) {

    res.status(500).json(error.message)
    
   }

}

//delete loan

const deleteLoan = async (req , res)=>{
    const {id} = req.params

    try {
        const delLoan = await Loan.getLoanbyIdAndDelete(id)
        res.status(200).json({delLoan})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getloanSummary = async (req,res)=>{
      const {userID} = req.params

      try {
        const summary = await getLoanFullSummary(userID)
        res.status(200).json({summary})
      } catch (error) {
        res.status(500).json(error.message)
        
      }


}

// const getTotalEmi = async (req , res)=>{
//     const{userID} = req.params
 

//     try {
//         const Total = await totalEmi(userID)
//         res.status(200).json(Total)

//     } catch (error) {

//         res.status(500).json(error.message)
        
//     }
// }

// const getIncEmiRatio = async (req , res)=>{
//     const {userID}  = req.params

//     try {
//         const ratio =  await incEmiRatio(userID)
//         res.status(200).json(ratio)
//     } catch (error) {
//         res.status(500).json(error.message)
        
//     }


// }


module.exports = {create , getLoans , getLoanbyId , getLoansByuserID , updateLoan , deleteLoan  , getloanSummary   }

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