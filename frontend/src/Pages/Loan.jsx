import React, { useEffect, useState } from 'react'
import '../Styles/Loan.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import LoanSidebar from '../Components/LoanSidebar'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { getLoans, createLoan, updateLoan, deleteLoan, getLoanAnalytics, getLoanInsights, getEmiAnalysis } from '../Api/loanApi'
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
          value: "12% hold"
        },
        {
          label: "Risk Level",
          value: "Low"
        },
        {
          label: "Active Loans",
          value: "3"
        },
        {
          label: "Monthly EMI",
          value: " 28,000"
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
        value: ""
      },
      {
        label: "Total Amount Repaid",
        value: " 6,50,000 hold"
      },
      {
        label: "Average Laon Size",
        value: " 3,25,000"
      },
      {
        label: "Largest Closed Loan",
        value: "Education Loan"
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
        {
          label: "Interest Paid",
          value: " on hold"
        },
        {
          label: "Loan Duration",
          value: "on hold"
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
          value: "9%"
        },
        {
          label: "Remainning Tenure",
          value: "36 Months"
        },
        {
          label: "Risk Level",
          value: "Low"
        }
      ]
    },

    CAR_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: " 4,50,000"
        },
        {
          label: "Interest Paid",
          value: " 60,0000"
        },
        {
          label: "Loan Duration",
          value: "5 Years"
        },
        {
          label: "Closure Status",
          value: "Completed"
        }
      ]
    },

    EDUCATION_ALL: {
      cards: [
        {
          label: "Toatl Education Loan",
          value: "2"
        },
        {
          label: "Average EMI",
          value: " 9,600"
        },
        {
          label: "Average Interest Rate",
          value: "7.2%"
        },
        {
          label: "Largest Education Loan",
          value: " 4,00,000"
        }
      ]
    },

    EDUCATION_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: " 9,600"
        },
        {
          label: "Interest Rate",
          value: "7.2%"
        },
        {
          label: "Remaining Tenure",
          value: "14 Months"
        },
        {
          label: "Risk Level",
          value: "Low"
        }
      ]
    },

    EDUCATION_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: " 4,80,000"
        },
        {
          label: "Interest Paid",
          value: " 80,000"
        },
        {
          label: "Loan Duration",
          value: "4 Years"
        },
        {
          label: "Closure Status",
          value: "Completed"
        }
      ]
    },

    PERSONAL_ALL: {
      cards: [
        {
          label: "Toatl Personal Loan",
          value: analyticsData?.summary?.[0]?.totalPersonalLoan
            ? `${analyticsData?.summary?.[0]?.totalPersonalLoan}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.summary?.[0]?.averageEMI
            ? `₹ ${analyticsData?.summary?.[0]?.averageEMI}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.summary?.[0]?.averageInterestRate
            ? `${analyticsData?.summary?.[0]?.averageInterestRate}%` : "-"
        },
        {
          label: "Largest Personal Loan",
          value: analyticsData?.largestPersonalLoan?.[0]?.principleAmount
            ? `${analyticsData?.largestPersonalLoan?.[0]?.principleAmount}` : "-"
        }
      ]
    },

    PERSONAL_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: analyticsData?.monthlyEMI
            ? `${analyticsData?.monthlyEMI}` : "-"

        },
        {
          label: "Interest Rate",
          value: analyticsData?.interestRate
            ? `${analyticsData?.interestRate}%` : "-"
        },
        {
          label: "Remaining Tenure",
          value: analyticsData?.remainingTenure
            ? `${analyticsData?.remainingTenure} Months` : "-"
        },
        {
          label: "Risk Level",
          value: analyticsData?.riskLevel
            ? `${analyticsData?.riskLevel}` : "-"

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
        {
          label: "Interest Paid",
          value: "On Hold"
        },
        {
          label: "Loan Duration",
          value: "On Hold"
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
            ? `${analyticsData.totalAmountRepaid}` : "-"
        },
        {
          label: "Interest Paid",
          value: "hold"
        },
        {
          label: "Loan Duration",
          value: analyticsData?.averageLoanDuration
            ? `${analyticsData.averageLoanDuration}` : "-"
        },
        {
          label: "Closure Status",
          value: "hold"
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
          value: analyticsData?.interestRate
            ? `${analyticsData.interestRate}` : "-"
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
        {
          label: "Interest Paid",
          value: "hold"
        },
        {
          label: "Loan Duration",
          value: "hold"
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
          value: analyticsData?.closureStatus
            ? `${analyticsData.closureStatus}` : "-"
        },
        {
          label: "Average EMI",
          value: analyticsData?.closureStatus
            ? `${analyticsData.closureStatus}` : "-"
        },
        {
          label: "Average Interest Rate",
          value: analyticsData?.closureStatus
            ? `${analyticsData.closureStatus}` : "-"
        },
        {
          label: "Largest Gold Loan",
          value: analyticsData?.closureStatus
            ? `${analyticsData.closureStatus}` : "-"
        }
      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: "4,500"
        },
        {
          label: "Interest Rate",
          value: "10.5%"
        },
        {
          label: "Remaining Tenure",
          value: "10 Months"
        },
        {
          label: "Risk Level",
          value: "Low"
        }
      ]
    },

    GOLD_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: "2,50,000"
        },
        {
          label: "Interest Paid",
          value: "40,000"
        },
        {
          label: "Loan Duration",
          value: "1 Year"
        },
        {
          label: "Closure Status",
          value: "Completed"
        }
      ]
    },

    AGRICULTURE_ALL: {
      cards: [
        {
          label: "Total Agriculture Loans",
          value: "2"
        },
        {
          label: "Average EMI",
          value: "6,500"
        },
        {
          label: "Average Interest Rate",
          value: "7.8%"
        },
        {
          label: "Largest Agriculture Loan",
          value: "5,00,000"
        }
      ]
    },

    AGRICULTURE_ACTIVE: {
      cards: [
        {
          label: "Monthly EMI",
          value: "6,500"
        },
        {
          label: "Interest Rate",
          value: "7.8%"
        },
        {
          label: "Remaining Tenure",
          value: "18 Months"
        },
        {
          label: "Risk Level",
          value: "Low"
        }
      ]
    },

    AGRICULTURE_CLOSED: {
      cards: [
        {
          label: "Amount Repaid",
          value: "5,00,000"
        },
        {
          label: "Interest Paid",
          value: "75,000"
        },
        {
          label: "Loan Duration",
          value: "3 Years"
        },
        {
          label: "Closure Status",
          value: "Completed"
        }
      ]
    }


  }

  const allocationCardConfig = {

    ALL_ALL: {
      cards: [
        {
          label: "Largest Loan Type",
          value: "Home Loan (60%)"
        },
        {
          label: "Smallest Loan Type",
          value: "Personal Loan (10%)"
        },
        {
          label: "Loan Types",
          value: "4"
        },
        {
          label: "Total Borrowed",
          value: "₹25,00,000"
        }
      ]
    },

    ALL_ACTIVE: {
      cards: [
        {
          label: "Largest Active Loan Type",
          value: "Home Loan (70%)"
        },
        {
          label: "Smallest Active Loan Type",
          value: "Education Loan (5%)"
        },
        {
          label: "Active Loan Types",
          value: "3"
        },
        {
          label: "Outstanding Amount",
          value: "₹18,00,000"
        }
      ]
    },

    ALL_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Loan Type",
          value: "Education Loan (50%)"
        },
        {
          label: "Smallest Completed Loan Type",
          value: "Personal Loan (10%)"
        },
        {
          label: "Completed Loan Types",
          value: "2"
        },
        {
          label: "Total Repaid",
          value: "₹7,00,000"
        }
      ]
    },

    HOME_ALL: {
      cards: [
        {
          label: "Largest Home Loan",
          value: "₹25,00,000"
        },
        {
          label: "Smallest Home Loan",
          value: "₹15,00,000"
        },
        {
          label: "Home Loans",
          value: "2"
        },
        {
          label: "Total Home Borrowed",
          value: "₹40,00,000"
        }
      ]
    },

    HOME_ACTIVE: {
      cards: [
        {
          label: "Largest Active Home Loan",
          value: "₹25,00,000"
        },
        {
          label: "Smallest Active Home Loan",
          value: "₹25,00,000"
        },
        {
          label: "Active Home Loans",
          value: "1"
        },
        {
          label: "Outstanding Amount",
          value: "₹20,00,000"
        }
      ]
    },

    HOME_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Home Loan",
          value: "₹15,00,000"
        },
        {
          label: "Smallest Completed Home Loan",
          value: "₹15,00,000"
        },
        {
          label: "Completed Home Loans",
          value: "1"
        },
        {
          label: "Amount Repaid",
          value: "₹15,00,000"
        }
      ]
    },

    EDUCATION_ALL: {
      cards: [
        {
          label: "Largest Education Loan",
          value: "₹4,00,000"
        },
        {
          label: "Smallest Education Loan",
          value: "₹2,00,000"
        },
        {
          label: "Education Loans",
          value: "2"
        },
        {
          label: "Total Borrowed",
          value: "₹6,00,000"
        }
      ]
    },

    EDUCATION_ACTIVE: {
      cards: [
        {
          label: "Largest Active Education Loan",
          value: "₹4,00,000"
        },
        {
          label: "Smallest Active Education Loan",
          value: "₹4,00,000"
        },
        {
          label: "Active Education Loans",
          value: "1"
        },
        {
          label: "Outstanding Amount",
          value: "₹1,20,000"
        }
      ]
    },

    EDUCATION_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Education Loan",
          value: "₹2,00,000"
        },
        {
          label: "Smallest Completed Education Loan",
          value: "₹2,00,000"
        },
        {
          label: "Completed Education Loans",
          value: "1"
        },
        {
          label: "Amount Repaid",
          value: "₹2,00,000"
        }
      ]
    },

    CAR_ALL: {
      cards: [
        {
          label: "Largest Car Loan",
          value: "₹8,00,000"
        },
        {
          label: "Smallest Car Loan",
          value: "₹5,00,000"
        },
        {
          label: "Car Loans",
          value: "2"
        },
        {
          label: "Total Borrowed",
          value: "₹13,00,000"
        }
      ]
    },

    CAR_ACTIVE: {
      cards: [
        {
          label: "Largest Active Car Loan",
          value: "₹8,00,000"
        },
        {
          label: "Smallest Active Car Loan",
          value: "₹8,00,000"
        },
        {
          label: "Active Car Loans",
          value: "1"
        },
        {
          label: "Outstanding Amount",
          value: "₹5,00,000"
        }
      ]
    },

    CAR_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Car Loan",
          value: "₹5,00,000"
        },
        {
          label: "Smallest Completed Car Loan",
          value: "₹5,00,000"
        },
        {
          label: "Completed Car Loans",
          value: "1"
        },
        {
          label: "Amount Repaid",
          value: "₹5,00,000"
        }
      ]
    },

    PERSONAL_ALL: {
      cards: [
        {
          label: "Largest Personal Loan",
          value: "₹3,00,000"
        },
        {
          label: "Smallest Personal Loan",
          value: "₹1,00,000"
        },
        {
          label: "Personal Loans",
          value: "3"
        },
        {
          label: "Total Borrowed",
          value: "₹5,00,000"
        }
      ]
    },

    PERSONAL_ACTIVE: {
      cards: [
        {
          label: "Largest Active Personal Loan",
          value: "₹3,00,000"
        },
        {
          label: "Smallest Active Personal Loan",
          value: "₹1,50,000"
        },
        {
          label: "Active Personal Loans",
          value: "2"
        },
        {
          label: "Outstanding Amount",
          value: "₹3,50,000"
        }
      ]
    },

    PERSONAL_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Personal Loan",
          value: "₹1,00,000"
        },
        {
          label: "Smallest Completed Personal Loan",
          value: "₹1,00,000"
        },
        {
          label: "Completed Personal Loans",
          value: "1"
        },
        {
          label: "Amount Repaid",
          value: "₹1,00,000"
        }
      ]
    },

    BUSINESS_ALL: {
      cards: [
        {
          label: "Largest Business Loan",
          value: "₹15,00,000"
        },
        {
          label: "Smallest Business Loan",
          value: "₹5,00,000"
        },
        {
          label: "Business Loans",
          value: "2"
        },
        {
          label: "Total Borrowed",
          value: "₹20,00,000"
        }
      ]
    },

    BUSINESS_ACTIVE: {
      cards: [
        {
          label: "Largest Active Business Loan",
          value: "₹15,00,000"
        },
        {
          label: "Smallest Active Business Loan",
          value: "₹15,00,000"
        },
        {
          label: "Active Business Loans",
          value: "1"
        },
        {
          label: "Outstanding Amount",
          value: "₹12,00,000"
        }
      ]
    },

    BUSINESS_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Business Loan",
          value: "₹5,00,000"
        },
        {
          label: "Smallest Completed Business Loan",
          value: "₹5,00,000"
        },
        {
          label: "Completed Business Loans",
          value: "1"
        },
        {
          label: "Amount Repaid",
          value: "₹5,00,000"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Largest Gold Loan",
          value: "₹1,50,000"
        },
        {
          label: "Smallest Gold Loan",
          value: "₹50,000"
        },
        {
          label: "Gold Loans",
          value: "3"
        },
        {
          label: "Total Borrowed",
          value: "₹3,00,000"
        }
      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Largest Active Gold Loan",
          value: "₹1,50,000"
        },
        {
          label: "Smallest Active Gold Loan",
          value: "₹1,50,000"
        },
        {
          label: "Active Gold Loans",
          value: "1"
        },
        {
          label: "Outstanding Amount",
          value: "₹90,000"
        }
      ]
    },

    GOLD_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Gold Loan",
          value: "₹1,00,000"
        },
        {
          label: "Smallest Completed Gold Loan",
          value: "₹50,000"
        },
        {
          label: "Completed Gold Loans",
          value: "2"
        },
        {
          label: "Amount Repaid",
          value: "₹1,50,000"
        }
      ]
    },

    AGRICULTURE_ALL: {
      cards: [
        {
          label: "Largest Agriculture Loan",
          value: "₹5,00,000"
        },
        {
          label: "Smallest Agriculture Loan",
          value: "₹3,00,000"
        },
        {
          label: "Agriculture Loans",
          value: "2"
        },
        {
          label: "Total Borrowed",
          value: "₹8,00,000"
        }
      ]
    },

    AGRICULTURE_ACTIVE: {
      cards: [
        {
          label: "Largest Active Agriculture Loan",
          value: "₹5,00,000"
        },
        {
          label: "Smallest Active Agriculture Loan",
          value: "₹5,00,000"
        },
        {
          label: "Active Agriculture Loans",
          value: "1"
        },
        {
          label: "Outstanding Amount",
          value: "₹3,00,000"
        }
      ]
    },

    AGRICULTURE_COMPLETED: {
      cards: [
        {
          label: "Largest Completed Agriculture Loan",
          value: "₹3,00,000"
        },
        {
          label: "Smallest Completed Agriculture Loan",
          value: "₹3,00,000"
        },
        {
          label: "Completed Agriculture Loans",
          value: "1"
        },
        {
          label: "Amount Repaid",
          value: "₹3,00,000"
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

      console.log(analytics.data.data)

      console.log(response.data.data)

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

  console.log(loans)
  console.log(analyticsData?.totalAmountRepaid)
  console.log(analyticsData)



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
                            <option value="BUSINESS">Car</option>
                            <option value="CAR">Car</option>
                            <option value="GOLD">Car</option>
                            <option value="AGRICULTURE">Car</option>



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