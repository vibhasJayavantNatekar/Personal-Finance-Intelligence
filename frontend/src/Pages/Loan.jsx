import React, { useEffect, useState } from 'react'
import '../Styles/Loan.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import LoanSidebar from '../Components/LoanSidebar'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { getLoans, createLoan, updateLoan, deleteLoan, getLoanAnalytics, getLaonAllocation, getLoanInsights, getEmiAnalysis } from '../Api/loanApi'
import AllocationChart from '../Components/AllocationChart'
import Insights from '../Components/insights'

const Loan = () => {

  const [ShowLoanModal, setShowLoanModal] = useState(false)
  const [viewmode, setViewmode] = useState("List")
  const [selectType, setselectType] = useState("ALL")
  const [selectStatus, setselectStatus] = useState("ALL")
  const [selectTPP, setselectTPP] = useState("10")
  const [loans, setloans] = useState([])
  const [Error, setError] = useState("")
  const [loanData, setLoanData] = useState({

    loanType: "PERSONAL",
    principleAmount: "",
    interestRate: "",
    tenure: "",
    emi: "",
    startDate: "",
    loanStatus: "ACTIVE",
    // notes: ""

  })
  const [analyticsData, setAnalyticsData] = useState([])
  const [allocationData, setAllocationData] = useState([])
  const [insightsData, setInsightsData] = useState([])
  const [emianalysisData, setEmianalysisData] = useState([])

  // const [totalLoan, setTotalLoan] = useState(0)
  const loanChartData = [
    {
      category: "Home Loan",
      amount: 60

    },
    {
      category: "Car Loan",
      amount: 25

    },
    {
      category: "Personal Loan",
      amount: 15

    }
  ]

  const totalLoan = loanChartData.reduce(
    (sum, item) => sum + item.amount,
    0
  )


  const analyticalConfig = {
    ALL_ALL: {
      cards: [
        {
          label: "Total EMI Burden",
          value: analyticsData?.totalEMIBurden
            ? `₹${analyticsData.totalEMIBurden}` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        },
        {
          label: "Active Loans",
          value: analyticsData?.activeLoans
            ? `${analyticsData.activeLoans}` : "-"
        },
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData.monthlyEMI}` : "-"
        }
      ]
    },

    ALL_ACTIVE: {
      cards: [
        {
          label: "Total EMI Burden",
          value: analyticsData?.totalEMIBurden
            ? `₹${analyticsData.totalEMIBurden}` : "-"

        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        },
        {
          label: "Active Loans",
          value: analyticsData?.activeLoans
            ? `${analyticsData.activeLoans}` : "-"

        },
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData.monthlyEMI}` : "-"
        }
      ]
    },

    ALL_CLOSED: {
      cards: [{
        label: "Closed Loans",
        value: analyticsData?.closedLoans
          ? `${analyticsData.closedLoans}` : "-"
      },
      {
        label: "Total Amount Repaid",
        value: analyticsData?.totalAmountRepaid
          ? `${analyticsData.totalAmountRepaid}` : "-"
      },
      {
        label: "Average Laon Size",
        value: analyticsData?.averageLoanSize
          ? `${analyticsData.averageLoanSize}` : "-"
      },
      {
        label: "Largest Closed Loan",
        value: analyticsData?.largestClosedLoan
          ? `${analyticsData.largestClosedLoan.loanType} (${analyticsData.largestClosedLoan.principleAmount}) ` : "-"
      }
      ]
    },

    HOME_ALL: {
      cards: [
        {
          label: "Total Home Loans",
          value: analyticsData?.totalLoan
            ? `${analyticsData.totalLoan}` : "-"

        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `${analyticsData.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate}` : "-"
        },
        {
          label: "Largest Home Loan",
          value: analyticsData?.largestHomelLoan
            ? `${analyticsData.largestHomelLoan}` : "-"
        }
      ]
    },

    HOME_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `₹${analyticsData.monthlyEMI}` : "-"
        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRate
            ? `${analyticsData.interestRate} %` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure}` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        }
      ]
    },

    HOME_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData?.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData?.closureStatus}` : "-"
        }
      ]
    },

    CAR_ALL: {
      cards: [
        {
          label: "Total Car Loans",
          value: analyticsData?.totalLoan
            ? `${analyticsData.totalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `₹ ${analyticsData.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate}%` : "-"
        },
        {
          label: "Largest Car Loan",
          value: analyticsData?.largestLoan
            ? `${analyticsData.largestLoan}` : "-"
        }
      ]
    },

    CAR_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData.monthlyEMI}` : "-"
        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRate
            ? `${analyticsData.interestRate} %` : "-"
        },
        {
          label: "Remainning Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure}` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        }
      ]
    },

    CAR_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData?.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData?.closureStatus}` : "-"
        }
      ]
    },

    EDUCATION_ALL: {
      cards: [
        {
          label: "Toatl Education Loan",
          value: analyticsData?.totalLoan
            ? `${analyticsData.totalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `${analyticsData.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate} %` : "-"
        },
        {
          label: "Largest Education Loan",
          value: analyticsData?.largestEducationlLoan
            ? `${analyticsData.largestEducationlLoan}` : "-"
        }
      ]
    },

    EDUCATION_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `₹${analyticsData.monthlyEMI}` : "-"
        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRate
            ? `${analyticsData.interestRate} %` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure}` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        }
      ]
    },

    EDUCATION_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData?.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData?.closureStatus}` : "-"
        }
      ]
    },

    PERSONAL_ALL: {
      cards: [
        {
          label: "Toatl Personal Loan",
          value: analyticsData?.totalPersonalLoan
            ? `${analyticsData.totalPersonalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `${analyticsData?.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate}` : "-"
        },
        {
          label: "Largest Personal Loan",
          value: analyticsData?.largestPersonalLoan
            ? `${analyticsData.largestPersonalLoan}` : "-"
        }
      ]
    },

    PERSONAL_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData.monthlyEMI}` : "-"

        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRate
            ? `${analyticsData.interestRate}%` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure} Months` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"

        }
      ]
    },

    PERSONAL_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData?.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData?.closureStatus}` : "-"
        }
      ]
    },
    CAR_ALL: {
      cards: [
        {
          label: "Total Car Loans",
          value: analyticsData?.totalLoan
            ? `${analyticsData.totalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `${analyticsData.averageEMI}` : "-"

        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate} %` : "-"
        },
        {
          label: "Largest Car Loan",
          value: analyticsData?.largestLoan
            ? `${analyticsData.largestLoan}` : "-"
        }
      ]
    },

    CAR_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData.monthlyEMI}` : "-"
        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRat
            ? `${analyticsData.interestRat}` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure}` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        }
      ]
    },

    CAR_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData?.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData?.closureStatus}` : "-"
        }
      ]
    },

    BUSSINESS_ALL: {
      cards: [
        {
          label: "Total Business Loans",
          value: analyticsData?.totalLoan
            ? `${analyticsData.totalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `${analyticsData.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate}` : "-"
        },
        {
          label: "Largest Business Loan",
          value: analyticsData?.largestLoan
            ? `${analyticsData.largestLoan}` : "-"
        }
      ]
    },

    BUSSINESS_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData.monthlyEMI}` : "-"
        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRat
            ? `${analyticsData.interestRat}` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure}` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        }
      ]
    },

    BUSSINESS_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData.closureStatus}` : "-"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Total Gold Loans",
          value: analyticsData?.totalLoan
            ? `${analyticsData.totalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `${analyticsData.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate}` : "-"
        },
        {
          label: "Largest Gold Loan",
          value: analyticsData?.largestLoan
            ? `${analyticsData.largestLoan}` : "-"
        }
      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `₹${analyticsData.monthlyEMI}` : "-"
        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRate
            ? `${analyticsData.interestRate} %` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure}` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        }
      ]
    },

    GOLD_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData?.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData?.closureStatus}` : "-"
        }
      ]
    },

    AGRICULTURE_ALL: {
      cards: [
        {
          label: "Total Gold Loans",
          value: analyticsData?.totalLoan
            ? `${analyticsData.totalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.averageEMI
            ? `${analyticsData.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.averageInterestRate
            ? `${analyticsData.averageInterestRate}` : "-"
        },
        {
          label: "Largest Gold Loan",
          value: analyticsData?.largestLoan
            ? `${analyticsData.largestLoan}` : "-"
        }
      ]
    },

    AGRICULTURE_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData.monthlyEMI}` : "-"
        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRate
            ? `${analyticsData.interestRate}%` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData.remainingTenure} Months` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData.riskLevel}` : "-"
        }
      ]
    },

    AGRICULTURE_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: analyticsData?.totalAmountRepaid
            ? `${analyticsData.totalAmountRepaid}` : "-"
        },
        // {
        //   label: "Interest Paid",
        //   value: "On Hold"
        // },
        {
          label: "Average Loan Size",
          value: analyticsData?.averageLoanSize
            ? `₹${analyticsData.averageLoanSize}` : "-"
        },
        {
          label: "Average Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration} Months` : "-"
        },
        {
          label: "Closure Status",
          value: analyticsData?.closureStatus
            ? `${analyticsData.closureStatus}` : "-"
        }
      ]
    }


  }

  const allocationCardConfig = {

    ALL_ALL: {
      cards: [
        {
          label: "Largest Loan Type",
          value: allocationData?.largestLoanType
            ? `${allocationData.largestLoanType.category} (${allocationData.largestLoanType.amount})` : "-"

        },
        {
          label: "Smallest Loan Type",
          value: allocationData?.smallestLoanType
            ? `${allocationData.smallestLoanType.category} (${allocationData.smallestLoanType.amount})` : "-"
        },
        {
          label: "Loan Types",
          value: allocationData?.loanTypes
            ? `${allocationData.loanTypes}` : "-"
        },
        {
          label: "Total Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"

        }
      ]
    },

    ALL_ACTIVE: {
      cards: [
        {
          label: "Largest Active Loan Type",
          value: allocationData?.largestActiveLoanType
            ? `${allocationData.largestActiveLoanType.category} (${allocationData.largestActiveLoanType.amount})` : "-"
        },
        {
          label: "Smallest Active Loan Type",
          value: allocationData?.smallestActiveLoanType
            ? `${allocationData.smallestActiveLoanType.category} (${allocationData.smallestActiveLoanType.amount})` : "-"
        },
        {
          label: "Active Loan Types",
          value: allocationData?.activeLoanTypes
            ? `${allocationData.activeLoanTypes}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    ALL_CLOSED: {
      cards: [
        {
          label: "Largest Completed Loan Type",
          value: allocationData?.largestCompletedLoanType
            ? `${allocationData.largestCompletedLoanType.category} (${allocationData.largestCompletedLoanType.amount})` : "-"
        },
        {
          label: "Smallest Completed Loan Type",
          value: allocationData?.smallestCompletedLoanType
            ? `${allocationData.smallestCompletedLoanType.category} (${allocationData.smallestCompletedLoanType.amount})` : "-"
        },
        {
          label: "Completed Loan Types",
          value: allocationData?.completedLoanTypes
            ? `${allocationData.completedLoanTypes}` : "-"
        },
        {
          label: "Total Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    },

    HOME_ALL: {
      cards: [
        {
          label: "Largest Home Loan",
          value: allocationData?.largestLoan?.principleAmount
            ? `${allocationData.largestLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Home Loan",
          value: allocationData?.smallestLoan?.principleAmount
            ? `${allocationData.smallestLoan.principleAmount}` : "-"
        },
        {
          label: "Home Loans",
          value: allocationData?.totalLoans
            ? `${allocationData.totalLoans}` : "-"
        },
        {
          label: "Total Home Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"
        }
      ]
    },

    HOME_ACTIVE: {
      cards: [
        {
          label: "Largest Active Home Loan",
          value: allocationData?.largestActiveLoan?.principleAmount
            ? `${allocationData.largestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Active Home Loan",
          value: allocationData?.smallestActiveLoan?.principleAmount
            ? `${allocationData.smallestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Active Home Loans",
          value: allocationData?.activeLoans
            ? `${allocationData.activeLoans}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    HOME_CLOSED: {
      cards: [
        {
          label: "Largest Completed Home Loan",
          value: allocationData?.largestCompletedLoan?.principleAmount
            ? `${allocationData.largestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Completed Home Loan",
          value: allocationData?.smallestCompletedLoan?.principleAmount
            ? `${allocationData.smallestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Completed Home Loans",
          value: allocationData?.completedLoans
            ? `${allocationData.completedLoans}` : "-"
        },
        {
          label: "Amount Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    },

    EDUCATION_ALL: {
      cards: [
        {
          label: "Largest Education Loan",
          value: allocationData?.largestLoan?.principleAmount
            ? `${allocationData.largestLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Education Loan",
          value: allocationData?.smallestLoan?.principleAmount
            ? `${allocationData.smallestLoan.principleAmount}` : "-"
        },
        {
          label: "Education Loans",
          value: allocationData?.totalLoans
            ? `${allocationData.totalLoans}` : "-"
        },
        {
          label: "Total Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"
        }
      ]
    },

    EDUCATION_ACTIVE: {
      cards: [
        {
          label: "Largest Active Education Loan",
          value: allocationData?.largestActiveLoan?.principleAmount
            ? `${allocationData.largestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Active Education Loan",
          value: allocationData?.smallestActiveLoan?.principleAmount
            ? `${allocationData.smallestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Active Education Loans",
          value: allocationData?.activeLoans
            ? `${allocationData.activeLoans}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    EDUCATION_CLOSED: {
      cards: [
        {
          label: "Largest Completed Education Loan",
          value: allocationData?.largestCompletedLoan
            ? `${allocationData.largestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Completed Education Loan",
          value: allocationData?.smallestCompletedLoan
            ? `${allocationData.smallestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Completed Education Loans",
          value: allocationData?.completedLoans
            ? `${allocationData.completedLoans}` : "-"
        },
        {
          label: "Amount Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    },

    CAR_ALL: {
      cards: [
        {
          label: "Largest Car Loan",
          value: allocationData?.largestLoan?.principleAmount
            ? `${allocationData.largestLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Car Loan",
          value: allocationData?.smallestLoan?.principleAmount
            ? `${allocationData.smallestLoan.principleAmount}` : "-"
        },
        {
          label: "Car Loans",
          value: allocationData?.totalLoans
            ? `${allocationData.totalLoans}` : "-"
        },
        {
          label: "Total Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"
        }
      ]
    },

    CAR_ACTIVE: {
      cards: [
        {
          label: "Largest Active Car Loan",
          value: allocationData?.largestActiveLoan?.principleAmount
            ? `${allocationData.largestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Active Car Loan",
          value: allocationData?.smallestActiveLoan?.principleAmount
            ? `${allocationData.smallestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Active Car Loans",
          value: allocationData?.activeLoans
            ? `${allocationData.activeLoans}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    CAR_CLOSED: {
      cards: [
        {
          label: "Largest Completed Car Loan",
          value: allocationData?.largestCompletedLoan
            ? `${allocationData.largestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Completed Car Loan",
          value: allocationData?.smallestCompletedLoan
            ? `${allocationData.smallestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Completed Car Loans",
          value: allocationData?.completedLoans
            ? `${allocationData.completedLoans}` : "-"
        },
        {
          label: "Amount Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    },

    PERSONAL_ALL: {
      cards: [
        {
          label: "Largest Personal Loan",
          value: allocationData?.largestLoan
            ? `${allocationData.largestLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Personal Loan",
          value: allocationData?.smallestLoan
            ? `${allocationData.smallestLoan.principleAmount}` : "-"
        },
        {
          label: "Personal Loans",
          value: allocationData?.totalLoans
            ? `${allocationData.totalLoans}` : "-"
        },
        {
          label: "Total Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"
        }
      ]
    },

    PERSONAL_ACTIVE: {
      cards: [
        {
          label: "Largest Active Personal Loan",
          value: allocationData?.largestActiveLoan
            ? `${allocationData.largestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Active Personal Loan",
          value: allocationData?.smallestActiveLoan
            ? `${allocationData.smallestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Active Personal Loans",
          value: allocationData?.activeLoans
            ? `${allocationData.activeLoans}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    PERSONAL_CLOSED: {
      cards: [
        {
          label: "Largest Completed Personal Loan",
          value: allocationData?.largestCompletedLoan
            ? `${allocationData.largestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Completed Personal Loan",
          value: allocationData?.smallestCompletedLoan
            ? `${allocationData.smallestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Completed Personal Loans",
          value: allocationData?.completedLoans
            ? `${allocationData.completedLoans}` : "-"
        },
        {
          label: "Amount Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    },

    BUSINESS_ALL: {
      cards: [
        {
          label: "Largest Business Loan",
          value: allocationData?.largestLoan?.principleAmount
            ? `${allocationData.largestLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Business Loan",
          value: allocationData?.smallestLoan?.principleAmount
            ? `${allocationData.smallestLoan.principleAmount}` : "-"
        },
        {
          label: "Business Loans",
          value: allocationData?.totalLoans
            ? `${allocationData.totalLoans}` : "-"
        },
        {
          label: "Total Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"
        }
      ]
    },

    BUSINESS_ACTIVE: {
      cards: [
        {
          label: "Largest Active Business Loan",
          value: allocationData?.largestActiveLoan?.principleAmount
            ? `${allocationData.largestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Active Business Loan",
          value: allocationData?.smallestActiveLoan?.principleAmount
            ? `${allocationData.smallestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Active Business Loans",
          value: allocationData?.activeLoans
            ? `${allocationData.activeLoans}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    BUSINESS_CLOSED: {
      cards: [
        {
          label: "Largest Completed Business Loan",
          value: allocationData?.largestCompletedLoan
            ? `${allocationData.largestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Completed Business Loan",
          value: allocationData?.smallestCompletedLoan
            ? `${allocationData.smallestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Completed Business Loans",
          value: allocationData?.completedLoans
            ? `${allocationData.completedLoans}` : "-"
        },
        {
          label: "Amount Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Largest Gold Loan",
          value: allocationData?.largestLoan?.principleAmount
            ? `${allocationData.largestLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Gold Loan",
          value: allocationData?.smallestLoan?.principleAmount
            ? `${allocationData.smallestLoan.principleAmount}` : "-"
        },
        {
          label: "Gold Loans",
          value: allocationData?.totalLoans
            ? `${allocationData.totalLoans}` : "-"
        },
        {
          label: "Total Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"
        }
      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Largest Active Gold Loan",
          value: allocationData?.largestActiveLoan?.principleAmount
            ? `${allocationData.largestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Active Gold Loan",
          value: allocationData?.smallestActiveLoan?.principleAmount
            ? `${allocationData.smallestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Active Gold Loans",
          value: allocationData?.activeLoans
            ? `${allocationData.activeLoans}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    GOLD_CLOSED: {
      cards: [
        {
          label: "Largest Completed Gold Loan",
          value: allocationData?.largestCompletedLoan
            ? `${allocationData.largestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Completed Gold Loan",
          value: allocationData?.smallestCompletedLoan
            ? `${allocationData.smallestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Completed Gold Loans",
          value: allocationData?.completedLoans
            ? `${allocationData.completedLoans}` : "-"
        },
        {
          label: "Amount Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    },

    AGRICULTURE_ALL: {
      cards: [
        {
          label: "Largest Agriculture Loan",
          value: allocationData?.largestLoan?.principleAmount
            ? `${allocationData.largestLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Agriculture Loan",
          value: allocationData?.smallestLoan?.principleAmount
            ? `${allocationData.smallestLoan.principleAmount}` : "-"
        },
        {
          label: "Agriculture Loans",
          value: allocationData?.totalLoans
            ? `${allocationData.totalLoans}` : "-"
        },
        {
          label: "Total Borrowed",
          value: allocationData?.totalBorrowed
            ? `${allocationData.totalBorrowed}` : "-"
        }
      ]
    },

    AGRICULTURE_ACTIVE: {
      cards: [
        {
          label: "Largest Active Agriculture Loan",
          value: allocationData?.largestActiveLoan?.principleAmount
            ? `${allocationData.largestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Active Agriculture Loan",
          value: allocationData?.smallestActiveLoan?.principleAmount
            ? `${allocationData.smallestActiveLoan.principleAmount}` : "-"
        },
        {
          label: "Active Agriculture Loans",
          value: allocationData?.activeLoans
            ? `${allocationData.activeLoans}` : "-"
        },
        {
          label: "Outstanding Amount",
          value: allocationData?.outstandingAmount
            ? `${allocationData.outstandingAmount}` : "-"
        }
      ]
    },

    AGRICULTURE_CLOSED: {
      cards: [
        {
          label: "Largest Completed Agriculture Loan",
          value: allocationData?.largestCompletedLoan
            ? `${allocationData.largestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Smallest Completed Agriculture Loan",
          value: allocationData?.smallestCompletedLoan
            ? `${allocationData.smallestCompletedLoan.principleAmount}` : "-"
        },
        {
          label: "Completed Agriculture Loans",
          value: allocationData?.completedLoans
            ? `${allocationData.completedLoans}` : "-"
        },
        {
          label: "Amount Repaid",
          value: allocationData?.amountRepaid
            ? `${allocationData.amountRepaid}` : "-"
        }
      ]
    }

  }

  const currentAnalysisConfig = analyticalConfig[`${selectType}_${selectStatus}`]
  const currentAllocationConfig = allocationCardConfig[`${selectType}_${selectStatus}`]

  const maxEmi = Math.max(
    ...emianalysisData.map(item => item.totalEMI)
  )

  const handleAddLoan = async (e) => {

    e.preventDefault()
    console.log(loanData)

    const token = localStorage.getItem("token")
    const response = await createLoan(loanData, token)
    console.log(response)


    alert("Added")
    console.log(loanData)
    fetchLoans()
    setShowLoanModal(false)
    setLoanData({
      loanType: "PERSONAL",
      principleAmount: "",
      interestRate: "",
      tenure: "",
      emi: "",
      startDate: "",
      loanStatus: "ACTIVE",
      // notes: ""
    })

  }

  const fetchLoans = async () => {

    try {

      const token = localStorage.getItem("token")
      const response = await getLoans(token)

      setloans(response.data.data)

      const analytics = await getLoanAnalytics(token, selectType, selectStatus)
      setAnalyticsData(analytics.data.data)

      console.log("Analytics data", analytics.data.data)

      console.log(response.data.data)

      const allocation = await getLaonAllocation(token, selectType, selectStatus)
      console.log("Alocation data", allocation.data.data)
      setAllocationData(allocation.data.data)




      const insights = await getLoanInsights(token)
      console.log(insights.data.data)
      setInsightsData(insights.data.data)

      const emiAnalysis = await getEmiAnalysis(token)
      setEmianalysisData(emiAnalysis.data.data)
      console.log(emiAnalysis.data.data)








    } catch (error) {
      selectErrorBarsSettings(error.response?.data?.message)
    }

  }

  useEffect(() => {

    fetchLoans()

  }, [selectType, selectStatus])





  return (
    <>

      <div className="section_wrapper">

        <Sidebar />

        <div className="main_section">

          <Navbar />

          <div className="section_content">

            <div className="expenses_overview overview">
              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label card_label">
                  <p>Active Loans</p>
                </div>
                <div className="expenses_overview_card_values overview_card_values">
                  2
                </div>
              </div>

              <div className="expenses_overview_card_divider overview_card_divider"></div>


              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label">
                  <p>Total Principle</p>
                </div>
                <div className="expenses_overview_card_values card_category_value overview_card_values ">
                  $ 5000
                </div>
              </div>

              <div className="expenses_overview_card_divider overview_card_divider "></div>



              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label">
                  <p>Monthly Emi</p>
                </div>
                <div className="expenses_overview_card_values overview_card_values">
                  $ 500
                </div>
              </div>


              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label">
                  <p>Emi Ratio</p>
                </div>
                <div className="expenses_overview_card_values overview_card_values">
                  $ 5000
                </div>
              </div>


            </div>


            <div className="section_workspace">
              <div className="section_sidebar_container">
                <LoanSidebar

                  view={viewmode}
                  setview={setViewmode}
                  selectType={selectType}
                  setselectType={setselectType}
                  selectStatus={selectStatus}
                  setselectStatus={setselectStatus}
                  selectTPP={selectTPP}
                  setselectTPP={setselectTPP}



                />

              </div>


              <div className="section_content">

                <div className="section_toolbar">
                  <div className="toolbar_left">
                    <h2 className="toolbar_heading">
                      Loans
                    </h2>

                    <p>Manage and track your liabilities</p>
                  </div>

                  <div className="toolbar_right">
                    <input
                      type="text"
                      placeholder="Search loans"
                      className="search_input"
                    />

                    <button className="import_btn">
                      Import Statement
                    </button>

                    <button className="add_expense_btn"
                      onClick={() => setShowLoanModal(true)}>
                      Add Loan
                    </button>
                  </div>
                </div>

                {ShowLoanModal && (
                  <div div className="modal_overlay">



                    <div className="modal">



                      {/* HEADER */}

                      <div className="modal_header">

                        <h2>

                          Add Loan

                        </h2>



                        <button
                          className="close_modal_btn"
                          onClick={() => setShowLoanModal(false)}
                        >

                          ✕

                        </button>

                      </div>








                      {/* Form */}

                      <form className="form"
                        onSubmit={handleAddLoan}
                      >


                        <div className="form_group">

                          <label>

                            Loan Type

                          </label>

                          <select
                            value={loanData.loanType}
                            onChange={(e) => {
                              console.log("Loan Type:", e.target.value);
                              setLoanData({
                                ...loanData,
                                loanType: e.target.value
                              })
                            }}
                          >
                            <option value="PERSONAL">Persoanl</option>
                            <option value="HOME">Home</option>
                            <option value="EDUCATION">Education</option>
                            <option value="BUSINESS">Bussiness</option>
                            <option value="CAR">Car</option>
                            <option value="GOLD">Gold</option>
                            <option value="AGRICULTURE">Agriculture</option>



                          </select>



                        </div>

                        <div className="form_group">

                          <label>

                            Principle Amount

                          </label>


                          <input
                            type="number"
                            value={loanData.principleAmount}
                            onChange={(e) => {
                              setLoanData({
                                ...loanData,
                                principleAmount: e.target.value
                              })
                            }}
                          />

                        </div>

                        <div className="form_group">
                          <label>
                            Interest Rate
                          </label>

                          <input
                            type="number"
                            value={loanData.interestRate}
                            onChange={(e) => {
                              setLoanData({
                                ...loanData,
                                interestRate: e.target.value
                              })
                            }}
                          />

                        </div>

                        <div className="form_group">
                          <label>
                            Tenure (Months)
                          </label>

                          <input
                            type="number"
                            value={loanData.tenure}
                            onChange={(e) => {
                              setLoanData({
                                ...loanData,
                                tenure: e.target.value
                              })
                            }}
                          />
                        </div>


                        <div className="form_group">
                          <label>

                            EMI

                          </label>

                          <input
                            type="number"
                            value={loanData.emi}
                            onChange={(e) => {
                              setLoanData({
                                ...loanData,
                                emi: e.target.value
                              })
                            }}
                          />

                        </div>

                        <div className="form_group">
                          <label>

                            Start Date

                          </label>

                          <input
                            type="date"
                            value={loanData.startDate}
                            onChange={(e) => {
                              setLoanData({
                                ...loanData,
                                startDate: e.target.value
                              })
                            }}
                          />

                        </div>


                        <div className="form_group">

                          <select
                            value={loanData.loanStatus}
                            onChange={(e) => {
                              setLoanData({
                                ...loanData,
                                loanStatus: e.target.value
                              })
                            }}
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="CLOSED">Completed</option>

                          </select>

                        </div>

                        {/* 
                        <div className="form_group">

                          <label>

                            Date

                          </label>


                          <input
                            type="date"
                            onChange={(e) =>
                              setExpenseData({
                                ...expenseData,
                                date: e.target.value
                              })
                            }
                          />

                        </div> */}



                        {/* BUTTONS */}

                        <div className="form_actions">



                          <button
                            type="button"
                            className="cancel_btn"
                            onClick={() => setShowExpensesModal(false)}
                          >

                            Cancel

                          </button>





                          <button
                            type="submit"
                            className="save_btn"
                          >

                            Save Loan

                          </button>

                        </div>

                      </form>

                    </div>

                  </div>
                )}

                {/* List */}

                {viewmode === "List" &&
                  <div className="expenses_transactions">

                    <div className="transactions_header">

                      <h3>Expense </h3>

                    </div>


                    <div className="transaction_table">

                      <div className="table_heading">

                        <p>Start Date</p>
                        <p>Loan Type</p>
                        <p>EMI</p>
                        <p>TENURE </p>
                        <p>Loan Status</p>

                      </div>


                      {
                        loans.filter((loan) => {

                          const typeMatch =
                            selectType === "ALL" ||
                            loan.loanType === selectType

                          const statusMatch =
                            selectStatus === "ALL" ||
                            loan.loanStatus === selectStatus

                          return typeMatch && statusMatch

                        })
                          .map((loan) => (


                            <div
                              key={loan._id}
                              className="transaction_row">

                              <p>{loan.startDate}</p>
                              <span className="category_tag">
                                {loan.loanType}
                              </span>

                              <p className="amount_text">
                                {loan.emi}
                              </p>

                              <p>{loan.tenure}</p>
                              <p>{loan.loanStatus}</p>

                            </div>
                          ))


                      }






                    </div>

                  </div>
                }

                {viewmode === "Analytical" &&
                  <div className="analytical_view">


                    <div className="analytical_view_card_container card_container">

                      {
                        currentAnalysisConfig.cards.map((card, index) => (
                          <div className="analytical_view_card card" key={index}>
                            <div className="analytical_view_card_label card_label">
                              <h4>{card.label}</h4>
                            </div>
                            <div className="analytical_view_card_values card_values">

                              {card.value}
                            </div>
                          </div>
                        ))

                      }

                      {/* {

                        analyticsData.map((loan) => (
                          <div className="analytical_view_card card">
                            <div className="analytical_view_card_label card_label">
                              <h4></h4>
                            </div>
                            <div className="analytical_view_card_values card_values">

                               {}
                            </div>
                          </div>
                        ))

                      }  */}



                    </div>

                    <div className="emi_analysis">

                      <h3>

                        EMI Analysis

                      </h3>

                      <div className="emi_analysis_list">

                        {

                          emianalysisData.map((loan, index) => (

                            <div
                              className="emi_row"
                              key={index}
                            >

                              <div className="emi_name">

                                {loan.loanType}

                              </div>



                              <div className="emi_bar_wrapper">

                                <div
                                  className="emi_bar"
                                  style={{
                                    width: `${(loan.totalEMI / maxEmi) * 100
                                      }%`
                                  }}
                                ></div>

                              </div>



                              <div className="emi_amount">

                                ₹{(loan.totalEMI)}

                              </div>

                            </div>

                          ))

                        }

                      </div>

                    </div>

                  </div>

                }

                {viewmode === "Allocation" &&
                  <div className="allocation_view">
                    <div className="allocation_summary">
                      {
                        currentAllocationConfig.cards.map((card, index) => (
                          <div className="allcation_summary_card" key={index}>
                            <div className="allocation_summary_card card_label">
                              <h4>{card.label}</h4>
                            </div>

                            <div className="allocation_summary_card card_value">
                              {card.value}
                            </div>
                          </div>

                        ))
                      }
                    </div>

                    <AllocationChart
                      title="Loan Distribution"
                      data={loanChartData}
                      total={totalLoan}
                    />


                  </div>



                }

                <Insights
                  data={insightsData}
                />


              </div>

            </div>







          </div>

        </div>

      </div>

    </>
  )
}

export default Loan