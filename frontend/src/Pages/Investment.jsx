import React, { useState } from 'react'
import '../Styles/Investment.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import InvestmentSidebar from '../Components/InvestmentSidebar'
import Live_market_strip from '../Components/Live_market_strip'
import '../Styles/Insights.css'

const Investment = () => {

  const [ShowInvestmentModal, setShowInvestmentModal] = useState(false)
  const [viewmode, setViewmode] = useState("List")
  const [selectType, setselectType] = useState("ALL")
  const [selectStatus, setselectStatus] = useState("ALL")
  const [selectTPP, setselectTPP] = useState("10")

   const [investmentData, setInvestmentData] = useState({
  
      assetType: "",
      assetName: "",
      investedAmt: "",
      purcahseDate: "",
      currentValue: "",
      status: "",
      notes: ""
  
    })

  const analyticsConfig = {

    ALL_ALL: {
      cards: [
        {
          label: "Total Investment",
          value: "₹5,00,000"
        },
        {
          label: "Current Value",
          value: "₹5,80,000"
        },
        {
          label: "Total Profit",
          value: "₹80,000"
        },
        {
          label: "Best Performer",
          value: "TCS"
        }
      ]
    },



    ALL_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: "₹4,50,000"
        },
        {
          label: "Current Value",
          value: "₹5,20,000"
        },
        {
          label: "Total Profit",
          value: "₹70,000"
        },
        {
          label: "Best Performer",
          value: "TCS"
        }
      ]
    },



    ALL_SOLD: {
      cards: [
        {
          label: "Total Sold Investments",
          value: "15"
        },
        {
          label: "Sale Value",
          value: "₹2,50,000"
        },
        {
          label: "Realized Profit",
          value: "₹45,000"
        },
        {
          label: "Best Exit",
          value: "Infosys"
        }
      ]
    },



    STOCK_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: "₹2,50,000"
        },
        {
          label: "Current Value",
          value: "₹3,00,000"
        },
        {
          label: "Stock Profit",
          value: "₹50,000"
        },
        {
          label: "Best Stock",
          value: "TCS"
        }
      ]
    },



    STOCK_SOLD: {
      cards: [
        {
          label: "Total Sold Stocks",
          value: "8"
        },
        {
          label: "Sale Value",
          value: "₹1,20,000"
        },
        {
          label: "Realized Profit",
          value: "₹20,000"
        },
        {
          label: "Best Trade",
          value: "Infosys"
        }
      ]
    },



    MUTUAL_FUND_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: "₹1,50,000"
        },
        {
          label: "Current Value",
          value: "₹1,80,000"
        },
        {
          label: "MF Profit",
          value: "₹30,000"
        },
        {
          label: "Best Fund",
          value: "HDFC Mid Cap"
        }
      ]
    },



    MUTUAL_FUND_SOLD: {
      cards: [
        {
          label: "Total Sold Funds",
          value: "5"
        },
        {
          label: "Redemption Value",
          value: "₹80,000"
        },
        {
          label: "Realized Profit",
          value: "₹15,000"
        },
        {
          label: "Best Exit",
          value: "SBI Small Cap"
        }
      ]
    },



    ETF_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: "₹90,000"
        },
        {
          label: "Current Value",
          value: "₹1,05,000"
        },
        {
          label: "ETF Profit",
          value: "₹15,000"
        },
        {
          label: "Best ETF",
          value: "Nifty ETF"
        }
      ]
    },



    ETF_SOLD: {
      cards: [
        {
          label: "Total Sold ETFs",
          value: "4"
        },
        {
          label: "Sale Value",
          value: "₹60,000"
        },
        {
          label: "Realized Profit",
          value: "₹10,000"
        },
        {
          label: "Best ETF Exit",
          value: "Nifty ETF"
        }
      ]
    },



    GOLD_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: "₹70,000"
        },
        {
          label: "Current Value",
          value: "₹82,000"
        },
        {
          label: "Gold Profit",
          value: "₹12,000"
        },
        {
          label: "Best Gold Asset",
          value: "Gold ETF"
        }
      ]
    },



    GOLD_SOLD: {
      cards: [
        {
          label: "Total Gold Sold",
          value: "3"
        },
        {
          label: "Sale Value",
          value: "₹50,000"
        },
        {
          label: "Realized Profit",
          value: "₹8,000"
        },
        {
          label: "Best Gold Sale",
          value: "Gold ETF"
        }
      ]
    },



    FD_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: "₹2,00,000"
        },
        {
          label: "Current FD Value",
          value: "₹2,25,000"
        },
        {
          label: "Interest Earned",
          value: "₹25,000"
        },
        {
          label: "Highest FD",
          value: "SBI FD"
        }
      ]
    },



    FD_SOLD: {
      cards: [
        {
          label: "Total FDs Closed",
          value: "6"
        },
        {
          label: "Maturity Value",
          value: "₹3,00,000"
        },
        {
          label: "Interest Earned",
          value: "₹40,000"
        },
        {
          label: "Best FD Return",
          value: "HDFC FD"
        }
      ]
    },



    BOND_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: "₹1,00,000"
        },
        {
          label: "Current Value",
          value: "₹1,10,000"
        },
        {
          label: "Interest Earned",
          value: "₹10,000"
        },
        {
          label: "Highest Yield Bond",
          value: "Gov Bond"
        }
      ]
    },



    BOND_SOLD: {
      cards: [
        {
          label: "Total Bonds Redeemed",
          value: "4"
        },
        {
          label: "Maturity Value",
          value: "₹1,50,000"
        },
        {
          label: "Interest Earned",
          value: "₹20,000"
        },
        {
          label: "Best Bond Return",
          value: "Gov Bond"
        }
      ]
    }
    ,
    STOCK_ALL: {
      cards: [
        {
          label: "Total Stocks",
          value: "12"
        },
        {
          label: "Current Value",
          value: "₹3,50,000"
        },
        {
          label: "Total Profit",
          value: "₹60,000"
        },
        {
          label: "Best Stock",
          value: "TCS"
        }
      ]
    },

    FD_ALL: {
      cards: [
        {
          label: "Total FDs",
          value: "8"
        },
        {
          label: "Current Value",
          value: "₹2,80,000"
        },
        {
          label: "Interest Earned",
          value: "₹35,000"
        },
        {
          label: "Highest FD",
          value: "SBI FD"
        }
      ]
    },

    ETF_ALL: {
      cards: [
        {
          label: "Total ETFs",
          value: "6"
        },
        {
          label: "Current Value",
          value: "₹1,20,000"
        },
        {
          label: "ETF Profit",
          value: "₹18,000"
        },
        {
          label: "Best ETF",
          value: "Nifty ETF"
        }
      ]
    },

    MUTUAL_FUND_ALL: {
      cards: [
        {
          label: "Total Mutual Funds",
          value: "10"
        },
        {
          label: "Current Value",
          value: "₹2,40,000"
        },
        {
          label: "MF Profit",
          value: "₹42,000"
        },
        {
          label: "Best Fund",
          value: "HDFC Mid Cap"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Total Gold Holdings",
          value: "5"
        },
        {
          label: "Current Value",
          value: "₹95,000"
        },
        {
          label: "Gold Profit",
          value: "₹12,000"
        },
        {
          label: "Best Gold Asset",
          value: "Gold ETF"
        }
      ]
    },

    BOND_ALL: {
      cards: [
        {
          label: "Total Bonds",
          value: "4"
        },
        {
          label: "Current Value",
          value: "₹1,40,000"
        },
        {
          label: "Interest Earned",
          value: "₹15,000"
        },
        {
          label: "Highest Yield Bond",
          value: "Gov Bond"
        }
      ]
    },

  }

  const performanceListConfig = {
    ALL_ALL: {
      cards: [
        {
          label: "Most Recent Investment ",
          value: "TCS"
        },
        {
          label: "Highest Investment",
          value: "HDFC"
        },
        {
          label: "Top Gainer",
          value: "Wipro"
        },
        {
          label: "Top Looser",
          value: "TCS"
        }
      ]
    },

    ALL_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment ",
          value: "TCS"
        },
        {
          label: "Highest Investment",
          value: "HDFC"
        },
        {
          label: "Top Gainer",
          value: "Wipro"
        },
        {
          label: "Top Looser",
          value: "TCS"
        }
      ]
    },

    STOCK_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "TCS",

        },
        {
          label: "Highest Stock Investment",
          value: "Reliance",

        },
        {
          label: "Top Gainer",
          value: "Reliance",

        },
        {
          label: "Top Looser",
          value: "Reliance",

        },
      ]
    },

    STOCK_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "TCS",

        },
        {
          label: "Highest Stock Investment",
          value: "Reliance",

        },
        {
          label: "Top Gainer",
          value: "Reliance",

        },
        {
          label: "Top Looser",
          value: "Reliance",

        },
      ]
    },

    MUTUAL_FUND_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "AXIS BANK"
        },
        {
          label: "Highest Investment ",
          value: "Motilal Owaswal"
        },
        {
          label: "Lowest Investment",
          values: "Axix mutual fund"
        },
        {
          label: "Top Gainer",
          value: "Motilas Owswal"
        }

      ]
    },

    MUTUAL_FUND_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "AXIS BANK"
        },
        {
          label: "Highest Investment ",
          value: "Motilal Owaswal"
        },
        {
          label: "Lowest Investment",
          values: "Axix mutual fund"
        },
        {
          label: "Top Gainer",
          value: "Motilas Owswal"
        }

      ]
    },

    EFT_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "Silver ETF"
        },
        {
          label: "Highest ETF Investment",
          value: "Flexi Gold ETF"
        },
        {
          label: "Lowest ETF Investment",
          value: "Midcap"
        },
        {
          label: "Top Gainer",
          value: "Flexi Gold ETF"
        }
      ]
    },

    EFT_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "Silver ETF"
        },
        {
          label: "Highest ETF Investment",
          value: "Flexi Gold ETF"
        },
        {
          label: "Lowest ETF Investment",
          value: "Midcap"
        },
        {
          label: "Top Gainer",
          value: "Flexi Gold ETF"
        }
      ]
    },

    FD_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "BOI"
        },
        {
          label: "Highest FD Amount",
          value: " 120000"
        },
        {
          label: "Lowest FD Amount",
          value: "  5000"
        },
        {
          label: "Nearest Maturity",
          value: "BOI"
        }
      ]
    },

    FD_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "BOI"
        },
        {
          label: "Highest FD Amount",
          value: " 120000"
        },
        {
          label: "Lowest FD Amount",
          value: "  5000"
        },
        {
          label: "Nearest Maturity",
          value: "BOI"
        }
      ]
    },

    BOND_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "Gov Bonds"
        },
        {
          label: "Highest Bond Investment",
          value: "Gov .Bond"
        },
        {
          label: "Lowest Bond Investment",
          value: "Gov. Bond"
        },
        {
          label: "Nearest Maturity",
          value: "Gov. Bond"
        }

      ]
    },

    BOND_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: "Gov Bonds"
        },
        {
          label: "Highest Bond Investment",
          value: "Gov .Bond"
        },
        {
          label: "Lowest Bond Investment",
          value: "Gov. Bond"
        },
        {
          label: "Nearest Maturity",
          value: "Gov. Bond"
        }

      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          values: "Gold"
        },
        {
          label: "Highest Gold Investment0",
          value: "12000"
        },
        {
          label: "Lowest Gold Investment",
          value: "5000"
        },
        {
          label: "Current Gold Price",
          value: "  54000"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          values: "Gold"
        },
        {
          label: "Highest Gold Investment0",
          value: "12000"
        },
        {
          label: "Lowest Gold Investment",
          value: "5000"
        },
        {
          label: "Current Gold Price",
          value: "  54000"
        }
      ]
    },

    ALL_SOLD: {
      cards: [
        {
          label: "Most Recent Sale",
          value: "TCS"
        },
        {
          label: "Highest Sale Value",
          value: " 1,50,000"
        },
        {
          label: "Lowest Sale value",
          value: " 8,000"
        },
        {
          label: "Most Profitable Exit",
          value: "Infosys"
        }
      ]
    },

    STOCK_SOLD: {
      cards: [
        {
          label: "Most Recent Stock Sale",
          value: "  TCS"
        },
        {
          label: "Highest Sale Value",
          value: " 5,000"
        },
        {
          label: "Lowest Sale Value",
          value: " 200"
        },
        {
          label: "Best Trade",
          value: "Info"
        }
      ]
    },

    MUTUAL_FUND_SOLD: {
      cards: [
        {
          label: "Most Recent Redemption",
          value: "HDFC Mid Cap"
        },
        {
          label: "Lowest Redemption",
          value: " 6000"
        },
        {
          label: "Highest Redemption",
          value: " 80,000"
        },
        {
          label: "Best Fund Exit",
          value: "SBI Small Cap"
        }
      ]
    },

    ETF_SOLD: {
      cards: [
        {
          label: "Most Recent ETF Sale",
          value: "Nifty ETF"
        },
        {
          label: "Highest Sale Value",
          value: " 70,000"
        },
        {
          label: "Lowest Sale Value",
          value: " 4000"
        },
        {
          label: "Best ETF Exit",
          value: "Nifty ETF"
        }
      ]
    },

    GOLD_SOLD: {
      cards: [
        {
          label: "Most Recent Gold Sale",
          value: "Gold ETF"
        },
        {
          label: "Highest Sale value",
          value: " 55,000"
        },
        {
          label: "Lowest Sale Value",
          value: " 8000"
        },
        {
          label: "Best Gold Exit",
          value: "Gold ETF"
        }
      ]
    },

    FD_SOLD: {
      cards: [
        {
          label: "Most Recent Closure",
          value: "SBI FD"
        },
        {
          label: "Highest Maturity Value",
          value: " 2,00,000"
        },
        {
          label: "Lowest Maturity Value",
          value: " 50,000"
        },
        {
          label: "Best FD Return",
          value: "HDFC FD"
        }
      ]
    },

    BOND_SOLD: {
      cards: [
        {
          label: "Most Recent Redemption",
          value: "Govt. Bond"
        },
        {
          label: "Highest Maturity Value",
          value: " 1,50,000"
        },
        {
          label: "Lowest Maturity Value",
          value: " 30,000"
        },
        {
          label: "Best Bond Return",
          value: "RBI BOND"
        }
      ]
    }


  }

  const allocationSummaryConfig = {
    ALL_ALL: {
      cards: [
        {
          label: "Largest Allocation",
          value: "Stocks (45%)"
        },
        {
          label: "Smallest Allocation",
          value: "ETF(5%)"
        },
        {
          label: "Asset Classes",
          value: "5"
        },
        {
          label: "Portfolio value",
          value: " 10,00,000"
        }
      ]
    },

    ALL_ACTIVE: {
      cards: [
        {
          label: "Largest Allocation",
          value: "Stocks (45%)"
        },
        {
          label: "Smallest Allocation",
          value: "ETF(5%)"
        },
        {
          label: "Asset Classes",
          value: "5"
        },
        {
          label: "Active Portfolio value",
          value: " 8,00,000"
        }
      ]
    },

    ALL_SOLD: {
      cards: [
        {
          label: "Largest Exit Allocation",
          value: "Stocks (40%)"
        },
        {
          label: "Smallest Exit Allocation",
          value: "ETF(8%)"
        },
        {
          label: "Asset Classes Sold",
          value: "4"
        },
        {
          label: "Total Sale value",
          value: " 1,50,000"
        }
      ]
    },

    STOCK_ALL: {
      cards: [
        {
          label: "Largest Holding",
          value: "TCS(35%)"
        },
        {
          label: "Smallest Holding",
          value: "Wipro (10%)"
        },
        {
          label: "Stock Holding",
          value: "8"
        },
        {
          label: "Stock Value",
          value: " 3,50,000"
        }
      ]
    },

    STOCK_ACTIVE: {
      cards: [
        {
          label: "Largest Holding",
          value: "TCS(50%)"
        },
        {
          label: "Smallest Holding",
          value: "Wipro(8%)"
        },
        {
          label: "Active Stocks",
          value: "6"
        },
        {
          label: "Current Value",
          value: " 3,00,000"
        }
      ]
    },

    STOCK_SOLD: {
      cards: [
        {
          label: "Largest Exit",
          value: "Infosys (30%)"
        },
        {
          label: "Smallest Exit",
          value: "Wipro (10%)"
        },
        {
          label: "Sold Stocks",
          value: "2"
        },
        {
          label: "Sale Value",
          value: " 50,000"
        }
      ]
    },

    MUTUAL_FUND_ACTIVE: {
      cards: [
        {
          label: "Largest Fund ",
          value: "HDFC Mid Cap"
        },
        {
          label: "Smallest Fund",
          value: "Axis Bluechi (10%)"
        },
        {
          label: "Active Funds",
          value: "4"
        },
        {
          label: "Current Value",
          value: " 1,80,000"
        }
      ]
    },

    MUTUAL_FUND_ALL: {
      cards: [
        {
          label: "Largest Fund ",
          value: "HDFC Mid Cap"
        },
        {
          label: "Smallest Fund",
          value: "Axis Bluechi (10%)"
        },
        {
          label: "Fund Holdings",
          value: "5"
        },
        {
          label: "Fund Value",
          value: " 2,00,000"
        }
      ]

    },

    MUTUAL_FUND_SOLD: {
      cards: [
        {
          label: "Largest Redemption",
          value: "SBI Small Cao (40%)"
        },
        {
          label: "Smallest Redemption",
          value: "Axis Bluechip (15%)"
        },
        {
          label: "Redeemed Funds",
          value: "1"
        },
        {
          label: "Redemption Value",
          value: " 20,000"
        }
      ]
    },

    FD_ALL: {
      cards: [
        {
          label: "Largest FD",
          value: "SBI FD (50%)"
        },
        {
          label: "Smallest FD",
          value: "ICICI FD (20%)"
        },
        {
          label: "FD Holdings",
          value: "4"
        },
        {
          label: "FD Value",
          value: " 2,50,000"
        }
      ]
    },

    FD_ACTIVE: {
      cards: [
        {
          label: "Largest FD",
          value: "SBI FD (50%)"
        },
        {
          label: "Smallest FD",
          value: "ICICI FD (20%)"
        },
        {
          label: "Active FDs",
          value: "3"
        },
        {
          label: "Current Value",
          value: " 2,00,000"
        }
      ]
    },

    FD_SOLD: {
      cards: [
        {
          label: "Largest Maturity",
          value: "HDFC FD (45%)"
        },
        {
          label: "Smallest Maturity",
          value: "ICICI FD (20%)"
        },
        {
          label: "Closed FDs",
          value: "1"
        },
        {
          label: "Maturity Value",
          value: " 50,000"
        }
      ]
    },

    ETF_ALL: {
      cards: [
        {
          label: "Largest ETF",
          value: "Nitfy ETF (55%)"
        },
        {
          label: "Smallest ETF",
          value: "Gold ETF (10%)"
        },
        {
          label: "ETF Holdings",
          value: "3"
        },
        {
          label: "ETF Value",
          value: " 1,20,000"
        }
      ]
    },

    ETF_ACTIVE: {
      cards: [
        {
          label: "Largest ETF",
          value: "Nitfy ETF (55%)"
        },
        {
          label: "Smallest ETF",
          value: "Gold ETF (10%)"
        },
        {
          label: "Active ETFs",
          value: "2"
        },
        {
          label: "Current Value",
          value: " 1,00,000"
        }
      ]
    },

    ETF_SOLD: {
      cards: [
        {
          label: "Largest ETF",
          value: "Nitfy ETF (55%)"
        },
        {
          label: "Smallest ETF",
          value: "Gold ETF (10%)"
        },
        {
          label: "Sold ETFs",
          value: "1"
        },
        {
          label: "Sale Value",
          value: " 20,000"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Largest Gold Holding",
          value: "Gold ETF (70%)"
        },
        {
          label: "Smallest Gold Holding",
          value: "Digital Gold (30%)"
        },
        {
          label: "Gold Holdings",
          value: "2"
        },
        {
          lable: "Gold Value",
          value: " 80,000"
        }
      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Largest Gold Holding",
          value: "Gold ETF (70%)"
        },
        {
          label: "Smallest Gold Holding",
          value: "Digital Gold (30%)"
        },
        {
          label: "Active Gold Assets",
          value: "2"
        },
        {
          label: "Current Value",
          value: " 70,000"
        }
      ]
    },

    GOLD_SOLD: {
      cards: [
        {
          label: "Largest Gold Exit",
          value: "Gold ETF (100%)"
        },
        {
          label: "Smallest Gold Exit",
          value: "Gold ETF (100%)"
        },
        {
          label: "Sold Gold Asset",
          value: "1"
        },
        {
          label: "Sale Value",
          value: " 10,000"
        }
      ]
    },

    BOND_ALL: {
      cards: [
        {
          label: "Largest Bond",
          value: "Goverment Bond"
        },
        {
          label: "Smallest Bond",
          value: "Corporate Bond"
        },
        {
          label: "Bond Holdings",
          value: "3"
        },
        {
          label: "Bond Value",
          value: " 1,50,000"
        }
      ]
    },

    BOND_ACTIVE: {
      cards: [
        {
          label: "Largest Bond",
          value: "Goverment Bond"
        },
        {
          label: "Smallest Bond",
          value: "Corporate Bond"
        },
        {
          label: "Active Bonds",
          value: "2"
        },
        {
          label: "Current Value",
          value: " 1,20,000"
        }
      ]
    },

    BOND_SOLD: {
      cards: [
        {
          label: "Largest Redemption",
          value: "Goverment Bond (100%)"
        },
        {
          label: "Smallest Redemption",
          value: "Goverment Bond (100%)"
        },
        {
          label: "Redeemed Bonds",
          value: 1
        },
        {
          label: "Maturity Value",
          value: " 30,000"
        }
      ]
    }

  }

  const currentConfig = analyticsConfig[`${selectType}_${selectStatus}`]
  const currentPerformaceList = performanceListConfig[`${selectType}_${selectStatus}`]
  const currentSummaryCards = allocationSummaryConfig[`${selectType}_${selectStatus}`]
  console.log(currentConfig)

  const handleAddInvestment = async (e) => {
  
    e.preventDefault()

    alert("Added")
    console.log(investmentData)
    setShowInvestmentModal(false)

    setInvestmentData({
      assetType: "",
      assetName: "",
      investedAmt: "",
      purcahseDate: "",
      currentValue: "",
      status: "",
      notes: ""
    })

  }


  return (
    <>

      <div className="section_wrapper">

        <Sidebar />

        <div className="main_section">

          <Navbar />

          <div className="section_content">

            <div className="expenses_overview overview">
              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label">
                  <p>Total Investments</p>
                </div>
                <div className="expenses_overview_card_values overview_card_values">
                  2000
                </div>
              </div>

              <div className="expenses_overview_card_divider overview_card_divider"></div>


              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label">
                  <p>Current Value</p>
                </div>
                <div className="expenses_overview_card_values card_category_value overview_card_values ">
                  $ 5000
                </div>
              </div>

              <div className="expenses_overview_card_divider overview_card_divider "></div>



              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label">
                  <p>Total Profit</p>
                </div>
                <div className="expenses_overview_card_values overview_card_values">
                  $ 500
                </div>
              </div>


              <div className="expenses_overview_card overview_card">
                <div className="expenses_overview_card_label overview_card_label">
                  <p>Active Assets</p>
                </div>
                <div className="expenses_overview_card_values overview_card_values">
                  12
                </div>
              </div>


            </div>

            <div className="section_workspace">
              <div className="section_sidebar_container">
                <InvestmentSidebar
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
                      Investments
                    </h2>

                    <p>Track and manage your portfolio</p>
                  </div>

                  <div className="toolbar_right">
                    <input
                      type="text"
                      placeholder="Search expenses"
                      className="search_input"
                    />

                    <button className="import_btn">
                      Import Statement
                    </button>

                    <button className="add_expense_btn"
                      onClick={() => setShowInvestmentModal(true)}>
                      Add Investment
                    </button>
                  </div>
                </div>

                {ShowInvestmentModal && (
                  <div div className="modal_overlay">



                    <div className="modal">



                      {/* HEADER */}

                      <div className="modal_header">

                        <h2>

                          Add Investment

                        </h2>



                        <button
                          className="close_modal_btn"
                          onClick={() => setShowInvestmentModal(false)}
                        >

                          ✕

                        </button>

                      </div>








                      {/* Form */}

                      <form className="form"
                        onSubmit={handleAddInvestment}
                      >






                        <div className="form_group">

                          <label>

                            Asset Type

                          </label>

                          <select
                            value={investmentData.assetType}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                assetType: e.target.value
                              })
                            }}
                          >
                            <option value="Stock">Stock</option>
                            <option value="FD">FD</option>
                            <option value="Mutual_fund">Mutual Fund</option>
                            <option value="Gold">Gold</option>

                          </select>



                        </div>

                        <div className="form_group">

                          <label>

                            Asset Name

                          </label>


                          <input
                            type="text"
                            value={investmentData.assetName}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                assetName: e.target.value
                              })
                            }}
                          />

                        </div>

                        <div className="form_group">
                          <label>
                            Amount
                          </label>

                          <input
                            type="number"
                            value={investmentData.investedAmt}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                investedAmt: e.target.value
                              })
                            }}
                          />

                        </div>

                        <div className="form_group">
                          <label>
                            Purcahe Date
                          </label>

                          <input
                            type="date"
                            value={investmentData.purcahseDate}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                purcahseDate: e.target.value
                              })
                            }}
                          />
                        </div>


                        <div className="form_group">
                          <label>

                            Current Value

                          </label>

                          <input
                            type="number"
                            value={investmentData.currentValue}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                currentValue: e.target.value
                              })
                            }}
                          />

                        </div>

                        <div className="form_group">
                          <select
                            value={investmentData.status}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                status: e.target.value
                              })
                            }}

                          >
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                          </select>

                        </div>
                        <div className="form_group">
                          <label>
                            Add note

                          </label>
                          <input
                            type="text"
                            value={investmentData.notes}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                notes: e.target.value
                              })
                            }}
                          />
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
                            onClick={() => setInvestmentData(false)}
                          >

                            Cancel

                          </button>





                          <button
                            type="submit"
                            className="save_btn"
                          >

                            Save Expense

                          </button>

                        </div>

                      </form>

                    </div>

                  </div>
                )}
                <Live_market_strip />

                {viewmode === "List" &&
                  <div className="expenses_transactions">

                    <div className="transactions_header">

                      <h3>Expense </h3>

                    </div>


                    <div className="transaction_table">

                      <div className="table_heading">

                        <p>Purchase Date</p>
                        <p>Type</p>
                        <p>Name</p>
                        <p>Invested Amount</p>
                        <p>Loan Status</p>

                      </div>


                      <div className="transaction_row">

                        <p>24 May 2026</p>
                        <span className="category_tag">
                          Stock
                        </span>

                        <p className="amount_text">
                          TCS
                        </p>

                        <p>5000</p>
                        <p>ACTIVE</p>

                      </div>


                      <div className="transaction_row">

                        <p>23 May 2026</p>

                        <span className="category_tag">
                          FD
                        </span>

                        <p className="amount_text">
                          AXix Bank
                        </p>

                        <p>500000</p>
                        <p>SOLD</p>



                      </div>


                      <div className="transaction_row">

                        <p>22 May 2026</p>

                        <span className="category_tag">
                          MUTUAL FUND
                        </span>

                        <p className="amount_text">
                          HDFC mid cap fund
                        </p>

                        <p>4500</p>
                        <p>ACTIVE</p>




                      </div>

                    </div>

                  </div>

                }

                {viewmode === "Analytical" &&
                  <div className="analytical_view">


                    <div className="analytical_view_card_container">

                      {
                        currentConfig.cards.map((card, index) => (
                          <div className="analytical_view_card" key={index}>

                            <div className="analytical_view_card_label card_label">
                              <h4> {card.label} </h4>
                            </div>

                            <div className="analytical_view_card_values card_values">

                              {card.value}
                            </div>

                          </div>
                        ))
                      }


                    </div>




                    {selectType === "ALL" &&
                      <div className="performance_analytical">

                        <div className="performance_analytical_card">
                          <div className="performance_analytical_card_label card_label">
                            <h4>Stocks</h4>
                          </div>

                          <div className='performance_analytical_card_label card_value' >

                            7 Holding
                          </div>

                        </div>

                        <div className="performance_analytical_card">
                          <div className="performance_analytical_card_label card_label">
                            <h4>Mutual Funds</h4>
                          </div>

                          <div className='performance_analytical_card_label card_value' >

                            4 Holding
                          </div>

                        </div>

                        <div className="performance_analytical_card">
                          <div className="performance_analytical_card_label card_label">
                            <h4> FD's </h4>
                          </div>

                          <div className='performance_analytical_card_label card_value' >

                            4 Holding
                          </div>

                        </div>

                        <div className="performance_analytical_card">
                          <div className="performance_analytical_card_label card_label">
                            <h4>Gold</h4>
                          </div>

                          <div className='performance_analytical_card_label card_value' >

                            2 Holding
                          </div>

                        </div>


                      </div>
                    }


                    {selectType === "STOCK" &&
                      <div className="stock_holding">
                        <div className="stock_holding_heading">
                          <h3>Stock Holdings</h3>


                        </div>

                        <div className="stock_list">
                          <div className="stock">
                            <h4>TCS</h4>
                            <p>₹ 5000</p>
                          </div>

                          <div className="stock">
                            <h4>TCS</h4>
                            <p>₹ 5000</p>
                          </div>

                          <div className="stock">
                            <h4>TCS</h4>
                            <p>₹ 5000</p>
                          </div>

                          <div className="stock">
                            <h4>TCS</h4>
                            <p>₹ 5000</p>
                          </div>

                        </div>
                      </div>

                    }
                    <div className="performance_list">

                      {
                        currentPerformaceList.cards.map((card, index) => (
                          <div className="performance_card" key={index}>

                            <span className="performance_label">
                              {card.label}
                            </span>

                            <span className="positive_value">
                              {card.value}
                            </span>

                          </div>
                        ))
                      }


                    </div>



                  </div>

                }

                {viewmode === "Allocation" &&
                  < div className="allocation_view">
                    <div className="allocation_chart">

                      <h3>

                        Portfolio Allocation

                      </h3>



                      <div className="allocation_chart_container">



                        {/* DONUT */}

                        <div className="fake_donut_chart">

                          <div className="donut_center">

                            <h4>

                              ₹12L

                            </h4>



                            <p>

                              Total

                            </p>

                          </div>

                        </div>





                        {/* LEGEND */}

                        <div className="allocation_legend">



                          <div className="legend_item">

                            <div className="legend_left">

                              <span className="legend_color stocks_color"></span>

                              <p>

                                Stocks

                              </p>

                            </div>



                            <h5>

                              45%

                            </h5>

                          </div>





                          <div className="legend_item">

                            <div className="legend_left">

                              <span className="legend_color mutual_color"></span>

                              <p>

                                Mutual Funds

                              </p>

                            </div>



                            <h5>

                              25%

                            </h5>

                          </div>





                          <div className="legend_item">

                            <div className="legend_left">

                              <span className="legend_color gold_color"></span>

                              <p>

                                Gold

                              </p>

                            </div>



                            <h5>

                              15%

                            </h5>

                          </div>





                          <div className="legend_item">

                            <div className="legend_left">

                              <span className="legend_color fd_color"></span>

                              <p>

                                FD

                              </p>

                            </div>



                            <h5>

                              10%

                            </h5>

                          </div>





                          <div className="legend_item">

                            <div className="legend_left">

                              <span className="legend_color etf_color"></span>

                              <p>

                                ETF

                              </p>

                            </div>



                            <h5>

                              5%

                            </h5>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="allocation_summary">

                      {
                        currentSummaryCards.cards.map((cards, index) => (
                          <div className="allcation_summary_card" key={index}>
                            <div className="allocation_summary_card card_label">
                              <h4>{cards.label}</h4>
                            </div>

                            <div className="allocation_summary_card card_value">
                              {cards.value}
                            </div>
                          </div>
                        ))
                      }

                    </div>

                  </div>
                }

                <div className="insights_container">
                  <h3 className="insights_heading">Investment Insights</h3>

                  <div className="insight_card">
                    <p>Stocks contributed highest returns this month.</p>
                  </div>

                  <div className="insight_card">
                    <p>Gold reduced overall portfolio volatility.</p>
                  </div>
                  <div className="insight_card">
                    <p> Diversification across assets is healthy</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Investment