const express = require('express')
const Loan = require('../Models/loan')
const User = require('../Models/userModel')
const Profile = require('../Models/userprofileModel')
const mongoose = require('mongoose')


// const loanSummary = async (userID) => {
//   const summary = await Loan.aggregate([
//     {
//       $match: {
//         userID: new mongoose.Types.ObjectId(userID),
//         loanStatus: "ACTIVE"
//       }
//     },
//     {
//       $group: {
//         _id: "$userID",
//         totalActiveLoans: { $sum: 1 },
//         totalPrincipal: { $sum: "$principalAmount" },
//         totalMonthlyEMI: { $sum: "$emi" }
//       }
//     }
//   ]);

//   return summary[0] || {
//     totalActiveLoans: 0,
//     totalPrincipal: 0,
//     totalMonthlyEMI: 0
//   }

// }

// const totalEmi = async (userID) => {
//   const result = await Loan.aggregate([
//     {
//       $match: {
//         userID: new mongoose.Types.ObjectId(userID),
//         loanStatus: "ACTIVE"
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         totalEmi: { $sum: "$emi" }
//       }
//     }
//   ])

//   return result[0]?.totalEmi || 0
// }


// const incEmiRatio = async (userID) => {


//   const emi = Number(await totalEmi(userID)) || 0

  
//   const profile = await Profile
//     .findOne({ userID })
//     .select("monthly_income -_id")
//     .lean()

//   const monthlyIncome = Number(profile?.monthly_income) || 0

//   if (monthlyIncome === 0) {
//     return 0
//   }

//   const ratio = (emi / monthlyIncome) * 100

//   return Number(ratio.toFixed(2))
// }


// module.exports = { loanSummary, totalEmi , incEmiRatio }



const getLoanFullSummary = async (userId) => {
  try {
    const loanAggregation = await Loan.aggregate([
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userId),
          loanStatus: "ACTIVE"
        }
      },
      {
        $group: {
          _id: null,
          totalActiveLoans: { $sum: 1 },
          totalPrincipal: { $sum: "$principalAmount" },
          totalMonthlyEMI: { $sum: "$emi" }
        }
      }
    ]);

    const loanData =
      loanAggregation.length > 0
        ? loanAggregation[0]
        : {
            totalActiveLoans: 0,
            totalPrincipal: 0,
            totalMonthlyEMI: 0
          };

    const user = await User.findById(userId);
    const income = user?.monthly_income || 0;

  
    const emiRatio =
      income > 0
        ? (loanData.totalMonthlyEMI / income) * 100
        : 0;

   
    let riskLevel = "Very Safe";

    if (emiRatio > 50) riskLevel = "High Risk";
    else if (emiRatio > 40) riskLevel = "Risky";
    else if (emiRatio > 30) riskLevel = "Moderate";
    else if (emiRatio > 20) riskLevel = "Safe";

    let insights = [];

    if (loanData.totalActiveLoans === 0)
      insights.push("You currently have no active loans.");

    if (emiRatio > 40)
      insights.push("Your EMI burden is high compared to your income.");

    if (loanData.totalActiveLoans > 2)
      insights.push("Multiple active loans increase financial pressure.");

    if (emiRatio <= 20 && loanData.totalActiveLoans > 0)
      insights.push("Your loan repayments are within safe limits.");

    
    return {
      summary: {
        totalActiveLoans: loanData.totalActiveLoans,
        totalPrincipal: loanData.totalPrincipal,
        totalMonthlyEMI: loanData.totalMonthlyEMI
      },
      monthlyIncome: income,
      emiRatio: Number(emiRatio.toFixed(2)),
      riskLevel,
      insights
    };

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getLoanFullSummary };