const express = require('express')
const Loan = require('../Models/loan')
const User = require('../Models/userModel')
const Profile = require('../Models/userprofileModel')
const mongoose = require('mongoose')
const investment = require('../Models/investment')



const buildLoanMatch = (userID, loanType = "ALL", loanStatus = "ALL") => {

  const match = {
    userID:
      new mongoose.Types.ObjectId(
        userID
      )
  };

  if (loanType !== "ALL") {
    match.loanType = loanType;
  }

  if (loanStatus !== "ALL") {
    match.loanStatus = loanStatus;
  }

  return match;
}

const getloanOverview = async (userID) => {

  const overview = await Loan.aggregate([
    {
      $match: {
        userID: new mongoose.Types.ObjectId(userID),
        loanStatus: "ACTIVE"
      }
    },
    {
      $group: {
        _id: null,
        activeLoans: {
          $sum: 1
        },
        totalPrinciple: {
          $sum: "$principleAmount"
        },
        monthlyEMI: {
          $sum: "$emi"
        }

      }
    }

  ])
  overview[0].lr = 4.5
  return overview[0]

}

const getEMIAnalysis = async (userID) => {

  const result = await Loan.aggregate([
    {
      $match: {
        userID: new mongoose.Types.ObjectId(userID),
        loanStatus: "ACTIVE"
      }
    },

    {
      $group: {
        _id: "$loanType",

        totalEMI: {
          $sum: "$emi"
        }
      }
    },

    {
      $sort: {
        totalEMI: -1
      }
    },

    {
      $project: {
        _id: 0,
        loanType: "$_id",
        totalEMI: 1
      }
    }
  ])

  return result
}

const getInvestmentOverview = async (userID) => {

  const overview = await investment.aggregate([
    {
      $match: {
        userID: new mongoose.Types.ObjectId(userID),

      }
    }
  ])

}

const getAllActiveAnalytics = async (userID) => {

  const profile = await Profile.findOne({ userID });

  const monthlyIncome = profile?.monthly_income || 0

  console.log(monthlyIncome);


  const match = buildLoanMatch(userID, "ALL", "ACTIVE")

  const result = await Loan.aggregate([

    {
      $match: match
    },

    {
      $group: {

        _id: null,

        activeLoans: {
          $sum: 1
        },

        monthlyEMI: {
          $sum: "$emi"
        }

      }
    }

  ]);

  const data = result[0] || { activeLoans: 0, monthlyEMI: 0 }

  const emiBurden = monthlyIncome > 0 ? (data.monthlyEMI / monthlyIncome) * 100 : 0

  let riskLevel = "";

  if (emiBurden < 20) {

    riskLevel = "Low";

  }
  else if (emiBurden < 40) {

    riskLevel = "Medium";

  }
  else {

    riskLevel = "High";

  }

  return {

    totalEMIBurden:
      Number(
        emiBurden.toFixed(0)
      ),

    riskLevel,

    activeLoans:
      data.activeLoans,

    monthlyEMI:
      data.monthlyEMI

  };

}

const getAllCompletedAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "ALL", "CLOSED")

  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,

              closedLoans: {
                $sum: 1
              },

              totalAmountRepaid: {
                $sum: "$principleAmount"
              },

              averageLoanSize: {
                $avg: "$principleAmount"
              }
            }
          }
        ],

        largestClosedLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          },
          {
            $project: {
              _id: 0,
              loanType: 1,
              principleAmount: 1
            }
          }
        ]
      }
    }
  ])

  const summary = result[0]?.summary?.[0] || {}

  return {
    closedLoans: summary.closedLoans || 0,
    totalAmountRepaid: summary.totalAmountRepaid || 0,
    averageLoanSize: summary.averageLoanSize || 0,
    largestClosedLoan:
      result[0]?.largestClosedLoan?.[0] || null
  }
}

const getPersonalAllAnalytics = async (userID) => {
  const match = buildLoanMatch(userID, "PERSONAL", "ALL")
  console.log(userID);

  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,
              totalPersonalLoan: {
                $sum: 1
              },
              averageEMI: {
                $avg: "$emi"
              },
              averageInterestRate: {
                $avg: "$interestRate"
              }
            }
          }
        ],

        largestPersonalLoan: [
          {
            $sort: {

              principleAmount: -1
            }
          },
          {
            $limit: 1
          },
          {
            $project: {
              _id: 0,
              principleAmount: 1
            }
          }
        ]
      }
    }

  ])

  const summary = result[0]?.summary?.[0] || {}

  return {
    totalPersonalLoan: summary.totalPersonalLoan || 0,
    averageEMI: summary.averageEMI || 0,
    averageInterestRate: summary.averageInterestRate || 0,
    largestPersonalLoan:
      result[0]?.largestPersonalLoan?.[0]?.principleAmount || 0
  }


}

const getPersonalActiveAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "PERSONAL", "ACTIVE")
  const profile = await Profile.findOne({ userID })
  const monthlyIncome = profile.monthly_income
  console.log(monthlyIncome);


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $addFields: {

        monthsPassed: {

          $dateDiff: {
            startDate: "$startDate",
            endDate: "$$NOW",
            unit: "month"
          }

        }

      }
    },

    {
      $addFields: {

        remainingTenure: {

          $max: [

            {
              $subtract: [
                "$tenure",
                "$monthsPassed"
              ]
            },

            0

          ]

        }

      }
    },
    {
      $group: {
        _id: null,

        monthlyEMI: {
          $sum: "$emi"
        },
        interestRate: {
          $avg: "$interestRate"
        },
        remainingTenure: {
          $avg: "$remainingTenure"
        }

      }
    }
  ])

  const data = result[0] || {
    monthlyEMI: 0,
    interestRate: 0,
    remainingTenure: 0
  };


  const emiBurden = monthlyIncome > 0 ? (data.monthlyEMI / monthlyIncome) * 100 : 0

  let riskLevel = "";

  if (emiBurden < 20) {
    riskLevel = "Low"
  }
  else if (emiBurden < 40) {
    riskLevel = "Medium"
  }
  else {
    riskLevel = "High"
  }

  data.riskLevel = riskLevel


  return data

}

const getPersonalCompletedAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "PERSONAL", "CLOSED")

  const result = await Loan.aggregate([

    {
      $match: match
    },
    {
      $group: {
        _id: null,

        totalAmountRepaid: {
          $sum: "$principleAmount"
        },
        averageLoanSize: {
          $avg: "$principalAmount"
        },
        averageLoanDuration: {
          $avg: "$tenure"
        }
      }
    }

  ])

  const data = result[0] ||
  {
    totalAmountRepaid: 0,
    averageLoanSize: 0,
    averageLoanDuration: 0,
    closureStatus: "Completed"
  }

  console.log(data)

  return data

}

const getHomeAllAnalytics = async (useID) => {

  const match = buildLoanMatch(useID, "HOME", "ALL")


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,

              totalLoan: {
                $sum: 1
              },

              averageEMI: {
                $avg: "$emi"
              },

              averageInterestRate: {
                $avg: "$interestRate"
              }
            }
          }
        ],

        largestHomelLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          }
        ]

      }
    }
  ])


  const data = {

    totalLoan:
      result[0].summary?.[0]
        ?.totalLoan || 0,

    averageEMI:
      result[0].summary?.[0]
        ?.averageEMI || 0,

    averageInterestRate:
      result[0].summary?.[0]
        ?.averageInterestRate || 0,

    largestHomelLoan:
      result[0].largestHomelLoan?.[0]
        ?.principleAmount || 0

  }

  return data

}

const getHomeActiveAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "HOME", "ACTIVE")
  const profile = await Profile.findOne({ userID })
  const monthlyIncome = profile.monthly_income
  console.log(monthlyIncome);


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $addFields: {

        monthsPassed: {

          $dateDiff: {
            startDate: "$startDate",
            endDate: "$$NOW",
            unit: "month"
          }

        }

      }
    },

    {
      $addFields: {

        remainingTenure: {

          $max: [

            {
              $subtract: [
                "$tenure",
                "$monthsPassed"
              ]
            },

            0

          ]

        }

      }
    },
    {
      $group: {
        _id: null,

        monthlyEMI: {
          $sum: "$emi"
        },
        interestRate: {
          $avg: "$interestRate"
        },
        remainingTenure: {
          $avg: "$remainingTenure"
        }

      }
    }
  ])

  const emiBurden = monthlyIncome > 0 ? (result[0].monthlyEMI / monthlyIncome) * 100 : 0

  console.log(emiBurden);

  let riskLevel = ""

  if (emiBurden < 20) {
    riskLevel = "Low"
  }
  else if (emiBurden < 40) {
    riskLevel = "Medium"
  }
  else {
    riskLevel = "High"
  }

  const data = {
    monthlyEMI: result[0].monthlyEMI || 0,
    interestRate: result[0].interestRate || 0,
    remainingTenure: result[0].remainingTenure || 0,
    riskLevel: riskLevel

  }

  return data

}

const getHomeCompletedAnalytics = async (userID) => {
  const match = buildLoanMatch(userID, "HOME", "CLOSED")

  const result = await Loan.aggregate([

    {
      $match: match
    },
    {
      $group: {
        _id: null,

        totalAmountRepaid: {
          $sum: "$principleAmount"
        },
        averageLoanSize: {
          $avg: "$principalAmount"
        },
        averageLoanDuration: {
          $avg: "$tenure"
        }
      }
    }

  ])

  const data = result[0] ||
  {
    totalAmountRepaid: 0,
    averageLoanSize: 0,
    averageLoanDuration: 0,
    closureStatus: "Completed"
  }

  console.log(data)

  return data


}

const getEducationAllAnalytics = async (userID) => {
  const match = buildLoanMatch(userID, "EDUCATION", "ALL")


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,

              totalLoan: {
                $sum: 1
              },

              averageEMI: {
                $avg: "$emi"
              },

              averageInterestRate: {
                $avg: "$interestRate"
              }
            }
          }
        ],

        largestEducationlLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          }
        ]

      }
    }
  ])

  const data = {

    totalLoan:
      result[0].summary?.[0]
        ?.totalLoan || 0,

    averageEMI:
      result[0].summary?.[0]
        ?.averageEMI || 0,

    averageInterestRate:
      result[0].summary?.[0]
        ?.averageInterestRate || 0,

    largestEducationlLoan:
      result[0].largestEducationlLoan?.[0]
        ?.principleAmount || 0

  }

  return data

}

const getEducationActiveAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "EDUCATION", "ACTIVE")
  const profile = await Profile.findOne({ userID })
  const monthlyIncome = profile.monthly_income
  console.log(monthlyIncome);


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $addFields: {

        monthsPassed: {

          $dateDiff: {
            startDate: "$startDate",
            endDate: "$$NOW",
            unit: "month"
          }

        }

      }
    },

    {
      $addFields: {

        remainingTenure: {

          $max: [

            {
              $subtract: [
                "$tenure",
                "$monthsPassed"
              ]
            },

            0

          ]

        }

      }
    },
    {
      $group: {
        _id: null,

        monthlyEMI: {
          $sum: "$emi"
        },
        interestRate: {
          $avg: "$interestRate"
        },
        remainingTenure: {
          $avg: "$remainingTenure"
        }

      }
    }
  ])

  const data = {
    monthlyEMI: result[0]?.monthlyEMI || 0,
    interestRate: result[0]?.interestRate || 0,
    remainingTenure: result[0]?.remainingTenure || 0

  }
  const emiBurden = monthlyIncome > 0 ? (result[0] ? result[0].monthlyEMI : 0 / monthlyIncome) * 100 : 0

  let riskLevel = ""

  if (emiBurden < 20) {
    riskLevel = "Low"
  }
  else if (emiBurden < 40) {
    riskLevel = "Medium"
  }
  else {
    riskLevel = "High"
  }

  data.riskLevel = riskLevel

  console.log(data);


  return data


}

const getEducationCompletedAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "EDUCATION", "COMPLETED")

  const result = await Loan.aggregate([

    {
      $match: match
    },
    {
      $group: {
        _id: null,

        totalAmountRepaid: {
          $sum: "$principleAmount"
        },
        averageLoanSize: {
          $avg: "$principalAmount"
        },
        averageLoanDuration: {
          $avg: "$tenure"
        }
      }
    }

  ])

  const data = result[0] ||
  {
    totalAmountRepaid: 0,
    averageLoanSize: 0,
    averageLoanDuration: 0,
    closureStatus: "Completed"
  }

  console.log(data)

  return data


}

const getCarAllAnalytics = async (userID) => {
  const match = buildLoanMatch(userID, "CAR", "ALL")


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,

              totalLoan: {
                $sum: 1
              },

              averageEMI: {
                $avg: "$emi"
              },

              averageInterestRate: {
                $avg: "$interestRate"
              }
            }
          }
        ],

        largestLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          }
        ]

      }
    }
  ])

  const data = {

    totalLoan:
      result[0].summary?.[0]
        ?.totalLoan || 0,

    averageEMI:
      result[0].summary?.[0]
        ?.averageEMI || 0,

    averageInterestRate:
      result[0].summary?.[0]
        ?.averageInterestRate || 0,

    largestLoan:
      result[0].largestLoan?.[0]
        ?.principleAmount || 0

  }

  console.log(data);


  return data
}

const getCarActiveAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "CAR", "ACTIVE")
  const profile = await Profile.findOne({ userID })
  const monthlyIncome = profile.monthly_income
  console.log(monthlyIncome);


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $addFields: {

        monthsPassed: {

          $dateDiff: {
            startDate: "$startDate",
            endDate: "$$NOW",
            unit: "month"
          }

        }

      }
    },

    {
      $addFields: {

        remainingTenure: {

          $max: [

            {
              $subtract: [
                "$tenure",
                "$monthsPassed"
              ]
            },

            0

          ]

        }

      }
    },
    {
      $group: {
        _id: null,

        monthlyEMI: {
          $sum: "$emi"
        },
        interestRate: {
          $avg: "$interestRate"
        },
        remainingTenure: {
          $avg: "$remainingTenure"
        }

      }
    }
  ])

  const data = {
    monthlyEMI: result[0]?.monthlyEMI || 0,
    interestRate: result[0]?.interestRate || 0,
    remainingTenure: result[0]?.remainingTenure || 0

  }
  const emiBurden = monthlyIncome > 0 ? (result[0] ? result[0].monthlyEMI : 0 / monthlyIncome) * 100 : 0

  let riskLevel = ""

  if (emiBurden < 20) {
    riskLevel = "Low"
  }
  else if (emiBurden < 40) {
    riskLevel = "Medium"
  }
  else {
    riskLevel = "High"
  }

  data.riskLevel = riskLevel

  console.log(data);


  return data

}

const getCarCompletedAnalytics = async (userID) => {


  const match = buildLoanMatch(userID, "CAR", "CLOSED")

  const result = await Loan.aggregate([

    {
      $match: match
    },
    {
      $group: {
        _id: null,

        totalAmountRepaid: {
          $sum: "$principleAmount"
        },
        averageLoanSize: {
          $avg: "$principleAmount"
        },
        averageLoanDuration: {
          $avg: "$tenure"
        }
      }
    }

  ])

  const data = result[0] ||
  {
    totalAmountRepaid: 0,
    averageLoanSize: 0,
    averageLoanDuration: 0,
    closureStatus: "Completed"
  }

  console.log(data)

  return data


}
const getGoldAllAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "GOLD", "ALL")


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,

              totalLoan: {
                $sum: 1
              },

              averageEMI: {
                $avg: "$emi"
              },

              averageInterestRate: {
                $avg: "$interestRate"
              }
            }
          }
        ],

        largestLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          }
        ]

      }
    }
  ])

  const data = {

    totalLoan:
      result[0].summary?.[0]
        ?.totalLoan || 0,

    averageEMI:
      result[0].summary?.[0]
        ?.averageEMI || 0,

    averageInterestRate:
      result[0].summary?.[0]
        ?.averageInterestRate || 0,

    largestLoan:
      result[0].largestLoan?.[0]
        ?.principleAmount || 0

  }

  return data



}


const getGoldActiveAnalytics = async (userID) => {


  const match = buildLoanMatch(userID, "GOLD", "ACTIVE")
  const profile = await Profile.findOne({ userID })
  const monthlyIncome = profile.monthly_income
  console.log(monthlyIncome);


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $addFields: {

        monthsPassed: {

          $dateDiff: {
            startDate: "$startDate",
            endDate: "$$NOW",
            unit: "month"
          }

        }

      }
    },

    {
      $addFields: {

        remainingTenure: {

          $max: [

            {
              $subtract: [
                "$tenure",
                "$monthsPassed"
              ]
            },

            0

          ]

        }

      }
    },
    {
      $group: {
        _id: null,

        monthlyEMI: {
          $sum: "$emi"
        },
        interestRate: {
          $avg: "$interestRate"
        },
        remainingTenure: {
          $avg: "$remainingTenure"
        }

      }
    }
  ])

  const data = {
    monthlyEMI: result[0]?.monthlyEMI || 0,
    interestRate: result[0]?.interestRate || 0,
    remainingTenure: result[0]?.remainingTenure || 0

  }
  const emiBurden = monthlyIncome > 0 ? (result[0] ? result[0].monthlyEMI : 0 / monthlyIncome) * 100 : 0

  let riskLevel = ""

  if (emiBurden < 20) {
    riskLevel = "Low"
  }
  else if (emiBurden < 40) {
    riskLevel = "Medium"
  }
  else {
    riskLevel = "High"
  }

  data.riskLevel = riskLevel

  console.log(data);


  return data


}

const getGoldCompletedAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "GOLD", "COMPLETED")

  const result = await Loan.aggregate([

    {
      $match: match
    },
    {
      $group: {
        _id: null,

        totalAmountRepaid: {
          $sum: "$principleAmount"
        },
        averageLoanSize: {
          $avg: "$principalAmount"
        },
        averageLoanDuration: {
          $avg: "$tenure"
        }
      }
    }

  ])

  const data = result[0] ||
  {
    totalAmountRepaid: 0,
    averageLoanSize: 0,
    averageLoanDuration: 0,
    closureStatus: "Completed"
  }

  console.log(data)

  return data

}

const getAgricultureAllAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "AGRICULTURE", "ALL")


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,

              totalLoan: {
                $sum: 1
              },

              averageEMI: {
                $avg: "$emi"
              },

              averageInterestRate: {
                $avg: "$interestRate"
              }
            }
          }
        ],

        largestLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          }
        ]

      }
    }
  ])

  const data = {

    totalLoan:
      result[0].summary?.[0]
        ?.totalLoan || 0,

    averageEMI:
      result[0].summary?.[0]
        ?.averageEMI || 0,

    averageInterestRate:
      result[0].summary?.[0]
        ?.averageInterestRate || 0,

    largestLoan:
      result[0].largestLoan?.[0]
        ?.principleAmount || 0

  }

  console.log(data);


  return data

}

const getAgricultureActiveAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "AGRICULTURE", "ACTIVE")
  const profile = await Profile.findOne({ userID })
  const monthlyIncome = profile.monthly_income
  console.log(monthlyIncome);


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $addFields: {

        monthsPassed: {

          $dateDiff: {
            startDate: "$startDate",
            endDate: "$$NOW",
            unit: "month"
          }

        }

      }
    },

    {
      $addFields: {

        remainingTenure: {

          $max: [

            {
              $subtract: [
                "$tenure",
                "$monthsPassed"
              ]
            },

            0

          ]

        }

      }
    },
    {
      $group: {
        _id: null,

        monthlyEMI: {
          $sum: "$emi"
        },
        interestRate: {
          $avg: "$interestRate"
        },
        remainingTenure: {
          $avg: "$remainingTenure"
        }

      }
    }
  ])

  const data = {
    monthlyEMI: result[0]?.monthlyEMI || 0,
    interestRate: result[0]?.interestRate || 0,
    remainingTenure: result[0]?.remainingTenure || 0

  }
  const emiBurden = monthlyIncome > 0 ? (result[0] ? result[0].monthlyEMI : 0 / monthlyIncome) * 100 : 0

  let riskLevel = ""

  if (emiBurden < 20) {
    riskLevel = "Low"
  }
  else if (emiBurden < 40) {
    riskLevel = "Medium"
  }
  else {
    riskLevel = "High"
  }

  data.riskLevel = riskLevel

  console.log(data);


  return data


}

const getAgricultureCompletedAnalytics = async (userID) => {


  const match = buildLoanMatch(userID, "AGRICULTURE", "COMPLETED")

  const result = await Loan.aggregate([

    {
      $match: match
    },
    {
      $group: {
        _id: null,

        totalAmountRepaid: {
          $sum: "$principleAmount"
        },
        averageLoanSize: {
          $avg: "$principalAmount"
        },
        averageLoanDuration: {
          $avg: "$tenure"
        }
      }
    }

  ])

  const data = result[0] ||
  {
    totalAmountRepaid: 0,
    averageLoanSize: 0,
    averageLoanDuration: 0,
    closureStatus: "Completed"
  }

  console.log(data)

  return data

}

const getBusinessAllAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "BUSSINESS", "ALL")


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        summary: [
          {
            $group: {
              _id: null,

              totalLoan: {
                $sum: 1
              },

              averageEMI: {
                $avg: "$emi"
              },

              averageInterestRate: {
                $avg: "$interestRate"
              }
            }
          }
        ],

        largestLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          }
        ]

      }
    }
  ])

  const data = {

    totalLoan:
      result[0].summary?.[0]
        ?.totalLoan || 0,

    averageEMI:
      result[0].summary?.[0]
        ?.averageEMI || 0,

    averageInterestRate:
      result[0].summary?.[0]
        ?.averageInterestRate || 0,

    largestLoan:
      result[0].largestLoan?.[0]
        ?.principleAmount || 0

  }

  return data


}

const getBusinessActiveAnalytics = async (userID) => {


  const match = buildLoanMatch(userID, "BUSSINESS", "ACTIVE")
  const profile = await Profile.findOne({ userID })
  const monthlyIncome = profile.monthly_income
  console.log(monthlyIncome);


  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $addFields: {

        monthsPassed: {

          $dateDiff: {
            startDate: "$startDate",
            endDate: "$$NOW",
            unit: "month"
          }

        }

      }
    },

    {
      $addFields: {

        remainingTenure: {

          $max: [

            {
              $subtract: [
                "$tenure",
                "$monthsPassed"
              ]
            },

            0

          ]

        }

      }
    },
    {
      $group: {
        _id: null,

        monthlyEMI: {
          $sum: "$emi"
        },
        interestRate: {
          $avg: "$interestRate"
        },
        remainingTenure: {
          $avg: "$remainingTenure"
        }

      }
    }
  ])

  const data = {
    monthlyEMI: result[0]?.monthlyEMI || 0,
    interestRate: result[0]?.interestRate || 0,
    remainingTenure: result[0]?.remainingTenure || 0

  }
  const emiBurden = monthlyIncome > 0 ? (result[0] ? result[0].monthlyEMI : 0 / monthlyIncome) * 100 : 0

  let riskLevel = ""

  if (emiBurden < 20) {
    riskLevel = "Low"
  }
  else if (emiBurden < 40) {
    riskLevel = "Medium"
  }
  else {
    riskLevel = "High"
  }

  data.riskLevel = riskLevel

  console.log(data);


  return data



}

const getBusinessCompletedAnalytics = async (userID) => {

  const match = buildLoanMatch(userID, "BUSSINESS", "CLOSED")

  const result = await Loan.aggregate([

    {
      $match: match
    },
    {
      $group: {
        _id: null,

        totalAmountRepaid: {
          $sum: "$principleAmount"
        },
        averageLoanSize: {
          $avg: "$principalAmount"
        },
        averageLoanDuration: {
          $avg: "$tenure"
        }
      }
    }

  ])

  const data = result[0] ||
  {
    totalAmountRepaid: 0,
    averageLoanSize: 0,
    averageLoanDuration: 0,
    closureStatus: "Completed"
  }

  console.log(data)

  return data

}




const getAllAllAllocation = async (userID) => {

  const match = buildLoanMatch(userID, "ALL", "ALL");

  const result = await Loan.aggregate([

    {
      $match: match
    },

    {
      $group: {

        _id: "$loanType",

        totalAmount: {
          $sum: "$principleAmount"
        }

      }
    },

    {
      $facet: {

        largestLoanType: [

          {
            $sort: {
              totalAmount: -1
            }
          },

          {
            $limit: 1
          }

        ],

        smallestLoanType: [

          {
            $sort: {
              totalAmount: 1
            }
          },

          {
            $limit: 1
          }

        ],

        summary: [

          {

            $group: {

              _id: null,

              loanTypes: {
                $sum: 1
              },

              totalBorrowed: {
                $sum: "$totalAmount"
              }

            }

          }

        ],

        chart: [

          {
            $sort: {
              totalAmount: -1
            }
          }

        ]

      }

    }

  ])

  const summary = result[0]?.summary?.[0] || {
    loanTypes: 0,
    totalBorrowed: 0
  }

  const totalBorrowed = summary.totalBorrowed;

  const chart = (result[0]?.chart || []).map(item => ({

    category: item._id,

    amount: item.totalAmount,

    percentage: totalBorrowed > 0
      ? Number(((item.totalAmount / totalBorrowed) * 100).toFixed(2))
      : 0

  }))

  const largest = result[0]?.largestLoanType?.[0] || null

  const smallest = result[0]?.smallestLoanType?.[0] || null

  const data = {

    largestLoanType: largest
      ? {
        category: largest._id,
        amount: largest.totalAmount,
        percentage: totalBorrowed > 0
          ? Number(((largest.totalAmount / totalBorrowed) * 100).toFixed(2))
          : 0
      }
      : null,

    smallestLoanType: smallest
      ? {
        category: smallest._id,
        amount: smallest.totalAmount,
        percentage: totalBorrowed > 0
          ? Number(((smallest.totalAmount / totalBorrowed) * 100).toFixed(2))
          : 0
      }
      : null,

    loanTypes: summary.loanTypes,

    totalBorrowed: summary.totalBorrowed,

    chart

  }

  return data;

}

const getAllActiveAllocation = async (userID) => {

  const match = buildLoanMatch(userID, "ALL", "ACTIVE")

  const result = await Loan.aggregate([

    {
      $match: match
    },

    {
      $group: {

        _id: "$loanType",

        totalAmount: {
          $sum: "$principleAmount"
        }

      }
    },

    {
      $facet: {

        largestActiveLoanType: [

          {
            $sort: {
              totalAmount: -1
            }
          },

          {
            $limit: 1
          }

        ],

        smallestActiveLoanType: [

          {
            $sort: {
              totalAmount: 1
            }
          },

          {
            $limit: 1
          }

        ],

        summary: [

          {
            $group: {

              _id: null,

              activeLoanTypes: {
                $sum: 1
              },

              outstandingAmount: {
                $sum: "$totalAmount"
              }

            }
          }

        ],

        chart: [

          {
            $sort: {
              totalAmount: -1
            }
          }

        ]

      }

    }

  ])

  const summary = result[0]?.summary?.[0] || {
    activeLoanTypes: 0,
    outstandingAmount: 0
  }

  const totalAmount = summary.outstandingAmount

  const chart = (result[0]?.chart || []).map(item => ({

    category: item._id,

    amount: item.totalAmount,

    percentage: totalAmount > 0
      ? Number(((item.totalAmount / totalAmount) * 100).toFixed(2))
      : 0

  }))

  const largest = result[0]?.largestActiveLoanType?.[0] || null

  const smallest = result[0]?.smallestActiveLoanType?.[0] || null

  const data = {

    largestActiveLoanType: largest
      ? {
        category: largest._id,
        amount: largest.totalAmount,
        percentage: totalAmount > 0
          ? Number(((largest.totalAmount / totalAmount) * 100).toFixed(2))
          : 0
      }
      : null,

    smallestActiveLoanType: smallest
      ? {
        category: smallest._id,
        amount: smallest.totalAmount,
        percentage: totalAmount > 0
          ? Number(((smallest.totalAmount / totalAmount) * 100).toFixed(2))
          : 0
      }
      : null,

    activeLoanTypes: summary.activeLoanTypes,

    outstandingAmount: summary.outstandingAmount,

    chart

  }

  return data

}

const getAllCompletedAllocation = async (userID) => {

  const match = buildLoanMatch(userID, "ALL", "COMPLETED")

  const result = await Loan.aggregate([

    {
      $match: match
    },

    {
      $group: {

        _id: "$loanType",

        totalAmount: {
          $sum: "$principleAmount"
        }

      }
    },

    {
      $facet: {

        largestCompletedLoanType: [

          {
            $sort: {
              totalAmount: -1
            }
          },

          {
            $limit: 1
          }

        ],

        smallestCompletedLoanType: [

          {
            $sort: {
              totalAmount: 1
            }
          },

          {
            $limit: 1
          }

        ],

        summary: [

          {

            $group: {

              _id: null,

              completedLoanTypes: {
                $sum: 1
              },

              amountRepaid: {
                $sum: "$totalAmount"
              }

            }

          }

        ],

        chart: [

          {
            $sort: {
              totalAmount: -1
            }
          }

        ]

      }

    }

  ])

  const summary = result[0]?.summary?.[0] || {
    completedLoanTypes: 0,
    amountRepaid: 0
  }

  const totalAmount = summary.amountRepaid;

  const chart = (result[0]?.chart || []).map(item => ({

    category: item._id,

    amount: item.totalAmount,

    percentage: totalAmount > 0
      ? Number(((item.totalAmount / totalAmount) * 100).toFixed(2))
      : 0

  }))

  const largest = result[0]?.largestCompletedLoanType?.[0] || null

  const smallest = result[0]?.smallestCompletedLoanType?.[0] || null

  const data = {

    largestCompletedLoanType: largest
      ? {
        category: largest._id,
        amount: largest.totalAmount,
        percentage: totalAmount > 0
          ? Number(((largest.totalAmount / totalAmount) * 100).toFixed(2))
          : 0
      }
      : null,

    smallestCompletedLoanType: smallest
      ? {
        category: smallest._id,
        amount: smallest.totalAmount,
        percentage: totalAmount > 0
          ? Number(((smallest.totalAmount / totalAmount) * 100).toFixed(2))
          : 0
      }
      : null,

    completedLoanTypes: summary.completedLoanTypes,

    amountRepaid: summary.amountRepaid,

    chart

  }

  return data

}



// const loanAnalytics = async (userID, type = "ALL", status = "ALL", month = "ALL", year = "ALL") => {

//   const match = {
//     userID: new mongoose.Types.ObjectId(userID)
//   }

//   if (type !== "ALL") {
//     match.loanType = type
//   }

//   if (status !== "ALL") {
//     match.loanStatus
//   }

//   if (
//     month !== "ALL" &&
//     year !== "ALL"
//   ) {

//     const startDate = new Date(
//       Number(year),
//       Number(month) - 1,
//       1
//     );

//     const endDate = new Date(
//       Number(year),
//       Number(month),
//       1
//     );

//     match.startDate = {
//       $gte: startDate,
//       $lt: endDate
//     };
//   }

//   const analytics = await Loan.aggregate([
//     {
//       $match: match
//     },
//     {
//       $group: {
//         _id: null,

//       }
//     }
//   ])



// }


const getLoanTypeAllocation = async (userID, loanType, status) => {

  const match = buildLoanMatch(userID, loanType, status);

  const result = await Loan.aggregate([
    {
      $match: match
    },
    {
      $facet: {

        largestLoan: [
          {
            $sort: {
              principleAmount: -1
            }
          },
          {
            $limit: 1
          }
        ],

        smallestLoan: [
          {
            $sort: {
              principleAmount: 1
            }
          },
          {
            $limit: 1
          }
        ],

        summary: [
          {
            $group: {
              _id: null,

              totalLoans: {
                $sum: 1
              },

              totalAmount: {
                $sum: "$principleAmount"
              }
            }
          }
        ]

      }
    }
  ]);

  const summary = result[0]?.summary?.[0] || {};

  if (status === "ALL") {
    return {
      largestLoan: result[0]?.largestLoan?.[0] || null,
      smallestLoan: result[0]?.smallestLoan?.[0] || null,
      totalLoans: summary.totalLoans || 0,
      totalBorrowed: summary.totalAmount || 0
    };
  }

  if (status === "ACTIVE") {
    return {
      largestActiveLoan: result[0]?.largestLoan?.[0] || null,
      smallestActiveLoan: result[0]?.smallestLoan?.[0] || null,
      activeLoans: summary.totalLoans || 0,
      outstandingAmount: summary.totalAmount || 0
    };
  }

  return {
    largestCompletedLoan: result[0]?.largestLoan?.[0] || null,
    smallestCompletedLoan: result[0]?.smallestLoan?.[0] || null,
    completedLoans: summary.totalLoans || 0,
    amountRepaid: summary.totalAmount || 0
  };
}



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
}

module.exports = {
  getLoanTypeAllocation, getloanOverview, getEMIAnalysis,
  getLoanFullSummary, buildLoanMatch, getAllActiveAnalytics, getAllCompletedAnalytics, getPersonalAllAnalytics, getPersonalActiveAnalytics, getPersonalCompletedAnalytics, getHomeAllAnalytics, getHomeActiveAnalytics, getHomeCompletedAnalytics, getEducationAllAnalytics, getEducationActiveAnalytics, getEducationCompletedAnalytics, getCarAllAnalytics, getCarActiveAnalytics, getCarCompletedAnalytics, getGoldAllAnalytics, getGoldActiveAnalytics, getGoldCompletedAnalytics, getAgricultureAllAnalytics, getAgricultureActiveAnalytics, getAgricultureCompletedAnalytics, getBusinessAllAnalytics, getBusinessActiveAnalytics, getBusinessCompletedAnalytics,
  getAllAllAllocation, getAllActiveAllocation, getAllCompletedAllocation
}