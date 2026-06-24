const express = require('express')
const Loan = require('../Models/loan')
const User = require('../Models/userModel')
const Profile = require('../Models/userprofileModel')
const mongoose = require('mongoose')



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
              principalAmount: 1
            }
          }
        ]

      }
    }



  ])


  console.log(result[0]);

  return result[0]
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

  console.log(result[0]);

  return result[0]
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

  const match = buildLoanMatch(userID, "PERSONAL", "COMPLETED")

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


  const match = buildLoanMatch(userID, "CAR", "COMPLETED")

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

  const match = buildLoanMatch(userID, "BUSSINESS", "COMPLETED")

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

const loanAnalytics = async (userID, type = "ALL", status = "ALL", month = "ALL", year = "ALL") => {

  const match = {
    userID: new mongoose.Types.ObjectId(userID)
  }

  if (type !== "ALL") {
    match.loanType = type
  }

  if (status !== "ALL") {
    match.loanStatus
  }

  if (
    month !== "ALL" &&
    year !== "ALL"
  ) {

    const startDate = new Date(
      Number(year),
      Number(month) - 1,
      1
    );

    const endDate = new Date(
      Number(year),
      Number(month),
      1
    );

    match.startDate = {
      $gte: startDate,
      $lt: endDate
    };
  }

  const analytics = await Loan.aggregate([
    {
      $match: match
    },
    {
      $group: {
        _id: null,

      }
    }
  ])



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
};

module.exports = { getLoanFullSummary, buildLoanMatch, getAllActiveAnalytics, getAllCompletedAnalytics, getPersonalAllAnalytics, getPersonalActiveAnalytics, getPersonalCompletedAnalytics, getHomeAllAnalytics, getHomeActiveAnalytics, getEducationAllAnalytics, getEducationActiveAnalytics, getEducationCompletedAnalytics, getCarAllAnalytics, getCarActiveAnalytics, getCarCompletedAnalytics, getGoldAllAnalytics, getGoldActiveAnalytics, getGoldCompletedAnalytics, getAgricultureAllAnalytics, getAgricultureActiveAnalytics, getAgricultureCompletedAnalytics, getBusinessAllAnalytics, getBusinessActiveAnalytics, getBusinessCompletedAnalytics };