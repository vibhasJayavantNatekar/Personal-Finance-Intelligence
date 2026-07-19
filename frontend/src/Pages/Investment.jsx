import React, { useEffect, useState } from 'react'
import '../Styles/Investment.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import InvestmentSidebar from '../Components/InvestmentSidebar'
import Live_market_strip from '../Components/Live_market_strip'
import Insights from '../Components/insights'
import AllocationChart from '../Components/AllocationChart'
import { createInvestment, getInvestment, updateInvestment, deleteInvestment, getInvestmentAnalytics, getPerformanceListAnalytics, getInvestmentAllocation, getStocksHoldings, getHoldingCount, getInsights } from '../Api/investmentApi'
import { all } from 'axios'

const Investment = () => {

  const [ShowInvestmentModal, setShowInvestmentModal] = useState(false)
  const [viewmode, setViewmode] = useState("List")
  const [selectType, setselectType] = useState("ALL")
  const [selectStatus, setselectStatus] = useState("ALL")
  const [selectTPP, setselectTPP] = useState("10")
  const [Investments, setInvestments] = useState([])
  const [analyticsData, setAnalyticsData] = useState([])
  const [allocationSummaryData, setAllocationSummaryData] = useState([])
  const [performanceListData, setperformanceListData] = useState([])
  const [stocksHoldingData, setstocksHoldingData] = useState([])
  const [chartData, setChartData] = useState([])
  const [holdingCounts, setHoldingCounts] = useState([])
  const [insightsData, setInsightsData] = useState([])
  const [investmentData, setInvestmentData] = useState({

    assetType: "STOCK",
    assetName: "",
    assetSymbol: "",
    investedAmt: "",
    quantity: "",
    purchaseDate: "",
    // currentValue: "",
    investmentStatus: "ACTIVE",
    // notes: ""

  })

  const investmentChartData = [
    {
      category: "Stocks",
      amount: 45

    },
    {
      category: "Mutual Funds",
      amount: 25

    }
  ]

  const totalInvestment = investmentChartData.reduce((sum, item) =>
    sum + item.amount, 0
  )

  const analyticsConfig = {

    ALL_ALL: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "Total Profit",
          value: analyticsData?.totalProfit
            ? `${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best Performer",
          value: analyticsData?.bestPerformer?.assetName
            ? `${analyticsData.bestPerformer.assetName}` : "-"
        }
      ]
    },



    ALL_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "Total Profit",
          value: analyticsData?.totalProfit
            ? `${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best Performer",
          value: analyticsData?.bestPerformer?.assetName
            ? `${analyticsData.bestPerformer.assetName}` : "-"
        }
      ]
    },



    ALL_SOLD: {
      cards: [
        {
          label: "Total Sold Investments",
          value: analyticsData?.totalSoldInvestments
            ? `${analyticsData.totalSoldInvestments}` : "-"
        },
        {
          label: "Sale Value",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Realized Profit",
          value: analyticsData?.realizedProfit
            ? `${analyticsData.realizedProfit}` : "-"
        },
        {
          label: "Best Exit",
          value: analyticsData?.bestExit?.assetName
            ? `${analyticsData.bestExit.assetName}` : "-"
        }
      ]
    },



    STOCK_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "Stock Profit",
          value: analyticsData?.totalProfit
            ? `₹ ${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best Stock",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },



    STOCK_SOLD: {
      cards: [
        {
          label: "Total Sold Stocks",
          value: analyticsData?.totalSoldAssets
            ? `${analyticsData.totalSoldAssets}` : "-"
        },
        {
          label: "Sale Value",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Realized Profit",
          value: analyticsData?.realizedProfit
            ? `${analyticsData.realizedProfit}` : "-hold"
        },
        {
          label: "Best Trade",
          value: analyticsData?.bestExit?.assetName
            ? `${analyticsData.bestExit.assetName}` : "-"
        }
      ]
    },



    MUTUAL_FUND_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "MF Profit",
          value: analyticsData?.totalProfit
            ? `${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best Fund",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },



    MUTUAL_FUND_SOLD: {
      cards: [
        {
          label: "Total Sold Funds",
          value: analyticsData?.totalSoldAssets
            ? `${analyticsData.totalSoldAssets}` : "-"
        },
        {
          label: "Redemption Value",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Realized Profit",
          value: analyticsData?.realizedProfit
            ? `${analyticsData.realizedProfit}` : "-"
        },
        {
          label: "Best Exit",
          value: analyticsData?.bestExit?.assetName
            ? `${analyticsData.bestExit.assetName}` : "-"
        }
      ]
    },



    ETF_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "ETF Profit",
          value: analyticsData?.totalProfit
            ? `${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best ETF",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },



    ETF_SOLD: {
      cards: [
        {
          label: "Total Sold ETFs",
          value: analyticsData?.totalSoldAssets
            ? `${analyticsData.totalSoldAssets}` : "-"
        },
        {
          label: "Sale Value",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Realized Profit",
          value: analyticsData?.realizedProfit
            ? `${analyticsData.realizedProfit}` : "-"
        },
        {
          label: "Best ETF Exit",
          value: analyticsData?.bestExit?.assetName
            ? `${analyticsData.bestExit.assetName}` : "-"
        }
      ]
    },



    GOLD_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "Gold Profit",
          value: analyticsData?.totalProfit
            ? `${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best Gold Asset",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },



    GOLD_SOLD: {
      cards: [
        {
          label: "Total Gold Sold",
          value: analyticsData?.totalSoldAssets
            ? `${analyticsData.totalSoldAssets}` : "-"
        },
        {
          label: "Sale Value",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Realized Profit",
          value: analyticsData?.realizedProfit
            ? `${analyticsData.realizedProfit}` : "-"
        },
        {
          label: "Best Gold Sale",
          value: analyticsData?.bestExit?.assetName
            ? `${analyticsData.bestExit.assetName}` : "-"
        }
      ]
    },



    FD_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current FD Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "Interest Earned",
          value: analyticsData?.totalProfit
            ? `${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Highest FD",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },



    FD_SOLD: {
      cards: [
        {
          label: "Total FDs Closed",
          value: analyticsData?.totalSoldAssets
            ? `${analyticsData.totalSoldAssets}` : "-"
        },
        {
          label: "Maturity Value",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Interest Earned",
          value: analyticsData?.realizedProfit
            ? `${analyticsData.realizedProfit}` : "-"
        },
        {
          label: "Best FD Return",
          value: analyticsData?.bestExit?.assetName
            ? `${analyticsData.bestExit.assetName}` : "-"
        }
      ]
    },



    BOND_ACTIVE: {
      cards: [
        {
          label: "Total Investment",
          value: analyticsData?.totalInvestment
            ? `${analyticsData.totalInvestment}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `${analyticsData.currentValue}` : "-"
        },
        {
          label: "Interest Earned",
          value: analyticsData?.totalProfit
            ? `${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Highest Yield Bond",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },



    BOND_SOLD: {
      cards: [
        {
          label: "Total Bonds Redeemed",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Maturity Value",
          value: analyticsData?.saleValue
            ? `${analyticsData.saleValue}` : "-"
        },
        {
          label: "Interest Earned",
          value: analyticsData?.realizedProfit
            ? `${analyticsData.realizedProfit}` : "-"
        },
        {
          label: "Best Bond Return",
          value: analyticsData?.bestExit?.assetName
            ? `${analyticsData.bestExit.assetName}` : "-"
        }
      ]
    }
    ,
    STOCK_ALL: {
      cards: [
        {
          label: "Total Stocks",
          value: analyticsData?.totalAssets
            ? `${analyticsData.totalAssets}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `₹ ${analyticsData.currentValue}` : "-"
        },
        {
          label: "Total Profit",
          value: analyticsData?.totalProfit
            ? `₹ ${analyticsData.totalProfit}` : "-"

        },
        {
          label: "Best Stock",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },

    FD_ALL: {
      cards: [
        {
          label: "Total FDs",
          value: analyticsData?.totalAssets
            ? `${analyticsData.totalAssets}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `₹ ${analyticsData.currentValue}` : "-"
        },
        {
          label: "Interest Earned",
          value: analyticsData?.totalProfit
            ? `₹ ${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Highest FD",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },

    ETF_ALL: {
      cards: [
        {
          label: "Total ETFs",
          value: analyticsData?.totalAssets
            ? `${analyticsData.totalAssets}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `₹ ${analyticsData.currentValue}` : "-"
        },
        {
          label: "ETF Profit",
          value: analyticsData?.totalProfit
            ? `₹ ${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best ETF",
          value: analyticsData?.bestAsset?.assetName
            ? ` ${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },

    MUTUAL_FUND_ALL: {
      cards: [
        {
          label: "Total Mutual Funds",
          value: analyticsData?.totalAssets
            ? `${analyticsData.totalAssets}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `₹ ${analyticsData.currentValue}` : "-"
        },
        {
          label: "MF Profit",
          value: analyticsData?.totalProfit
            ? `₹ ${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best Fund",
          value: analyticsData?.bestAsset?.assetName
            ? ` ${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Total Gold Holdings",
          value: analyticsData?.totalAssets
            ? `${analyticsData.totalAssets}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `₹ ${analyticsData.currentValue}` : "-"
        },
        {
          label: "Gold Profit",
          value: analyticsData?.totalProfit
            ? `₹ ${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Best Gold Asset",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },

    BOND_ALL: {
      cards: [
        {
          label: "Total Bonds",
          value: analyticsData?.totalAssets
            ? `${analyticsData.totalAssets}` : "-"
        },
        {
          label: "Current Value",
          value: analyticsData?.currentValue
            ? `₹ ${analyticsData.currentValue}` : "-"
        },
        {
          label: "Interest Earned",
          value: analyticsData?.totalProfit
            ? `₹ ${analyticsData.totalProfit}` : "-"
        },
        {
          label: "Highest Yield Bond",
          value: analyticsData?.bestAsset?.assetName
            ? `${analyticsData.bestAsset.assetName}` : "-"
        }
      ]
    },

  }

  const performanceListConfig = {
    ALL_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        },
        {
          label: "Top Looser",
          value: performanceListData?.topLoser?.assetName || "-"
        }
      ]
    },

    ALL_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        },
        {
          label: "Top Looser",
          value: performanceListData?.topLoser?.assetName || "-"
        }
      ]
    },

    STOCK_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Stock Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        },
        {
          label: "Top Looser",
          value: performanceListData?.topLoser?.assetName || "-"
        }
      ]
    },

    STOCK_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Stock Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        },
        {
          label: "Top Looser",
          value: performanceListData?.topLoser?.assetName || "-"
        }
      ]
    },

    MUTUAL_FUND_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Lowest Investment",
          value: "-hold"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        }
      ]
    },

    MUTUAL_FUND_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Lowest Investment",
          value: "-hold"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        }
      ]
    },

    ETF_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest ETF Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Lowest ETF Investment",
          value: "-hold"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        }
      ]
    },

    ETF_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest ETF Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Lowest ETF Investment",
          value: "-hold"
        },
        {
          label: "Top Gainer",
          value: performanceListData?.topGainer?.assetName || "-"
        }
      ]
    },

    FD_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest FD Amount",
          value: performanceListData?.highestInvestment?.investedAmt || "-"
        },
        {
          label: "Lowest FD Amount",
          value: "-hold"
        },
        {
          label: "Nearest Maturity",
          value: "-hold"
        }
      ]
    },

    FD_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest FD Amount",
          value: performanceListData?.highestInvestment?.investedAmt || "-"
        },
        {
          label: "Lowest FD Amount",
          value: "-hold"
        },
        {
          label: "Nearest Maturity",
          value: "-hold"
        }
      ]
    },

    BOND_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Bond Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Lowest Bond Investment",
          value: "-hold"
        },
        {
          label: "Nearest Maturity",
          value: "-hold"
        }
      ]
    },

    BOND_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Bond Investment",
          value: performanceListData?.highestInvestment?.assetName || "-"
        },
        {
          label: "Lowest Bond Investment",
          value: "-hold"
        },
        {
          label: "Nearest Maturity",
          value: "-hold"
        }
      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Gold Investment0",
          value: performanceListData?.highestInvestment?.investedAmt || "-"
        },
        {
          label: "Lowest Gold Investment",
          value: "-hold"
        },
        {
          label: "Current Gold Price",
          value: "-hold"
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Most Recent Investment",
          value: performanceListData?.mostRecentInvestment?.assetName || "-"
        },
        {
          label: "Highest Gold Investment0",
          value: performanceListData?.highestInvestment?.investedAmt || "-"
        },
        {
          label: "Lowest Gold Investment",
          value: "-hold"
        },
        {
          label: "Current Gold Price",
          value: "-hold"
        }
      ]
    },

    ALL_SOLD: {
      cards: [
        {
          label: "Most Recent Sale",
          value: performanceListData?.mostRecentSale?.assetName || "-"
        },
        {
          label: "Highest Sale Value",
          value: performanceListData?.highestSale?.sellAmount || "-"
        },
        {
          label: "Lowest Sale value",
          value: performanceListData?.lowestSale?.sellAmount || "-"
        },
        {
          label: "Most Profitable Exit",
          value: performanceListData?.bestExit?.assetName || "-"
        }
      ]
    },

    STOCK_SOLD: {
      STOCK_SOLD: {
        cards: [
          {
            label: "Most Recent Stock Sale",
            value: performanceListData?.mostRecentSale?.assetName || "-"
          },
          {
            label: "Highest Sale Value",
            value: performanceListData?.highestSale?.assetName || "-"
          },
          {
            label: "Lowest Sale Value",
            value: performanceListData?.lowestSale?.assetName || "-"
          },
          {
            label: "Best Stock Exit",
            value: performanceListData?.bestExit?.assetName || "-"
          }
        ]
      },
    },

    MUTUAL_FUND_SOLD: {
      cards: [
        {
          label: "Most Recent Redemption",
          value: performanceListData?.mostRecentSale?.assetName || "-"
        },
        {
          label: "Highest Redemption",
          value: performanceListData?.highestSale?.assetName || "-"
        },
        {
          label: "Lowest Redemption",
          value: performanceListData?.lowestSale?.assetName || "-"
        },
        {
          label: "Best Fund Exit",
          value: performanceListData?.bestExit?.assetName || "-"
        }
      ]
    },

    ETF_SOLD: {
      cards: [
        {
          label: "Most Recent ETF Sale",
          value: performanceListData?.mostRecentSale?.assetName || "-"
        },
        {
          label: "Highest Sale Value",
          value: performanceListData?.highestSale?.assetName || "-"
        },
        {
          label: "Lowest Sale Value",
          value: performanceListData?.lowestSale?.assetName || "-"
        },
        {
          label: "Best ETF Exit",
          value: performanceListData?.bestExit?.assetName || "-"
        }
      ]
    },

    GOLD_SOLD: {
      cards: [
        {
          label: "Most Recent Gold Sale",
          value: performanceListData?.mostRecentSale?.assetName || "-"
        },
        {
          label: "Highest Sale Value",
          value: performanceListData?.highestSale?.assetName || "-"
        },
        {
          label: "Lowest Sale Value",
          value: performanceListData?.lowestSale?.assetName || "-"
        },
        {
          label: "Best Gold Exit",
          value: performanceListData?.bestExit?.assetName || "-"
        }
      ]
    },

    FD_SOLD: {
      cards: [
        {
          label: "Most Recent FD Closure",
          value: performanceListData?.mostRecentSale?.assetName || "-"
        },
        {
          label: "Highest Maturity Value",
          value: performanceListData?.highestSale?.assetName || "-"
        },
        {
          label: "Lowest Maturity Value",
          value: performanceListData?.lowestSale?.assetName || "-"
        },
        {
          label: "Best FD Return",
          value: performanceListData?.bestExit?.assetName || "-"
        }
      ]
    },

    BOND_SOLD: {
      cards: [
        {
          label: "Most Recent Bond Redemption",
          value: performanceListData?.mostRecentSale?.assetName || "-"
        },
        {
          label: "Highest Maturity Value",
          value: performanceListData?.highestSale?.assetName || "-"
        },
        {
          label: "Lowest Maturity Value",
          value: performanceListData?.lowestSale?.assetName || "-"
        },
        {
          label: "Best Bond Return",
          value: performanceListData?.bestExit?.assetName || "-"
        }
      ]
    },


  }

  const allocationSummaryConfig = {
    ALL_ALL: {
      cards: [
        {
          label: "Largest Allocation",
          value: allocationSummaryData?.largestAllocation
            ? `${allocationSummaryData.largestAllocation.category} (${allocationSummaryData.largestAllocation.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Allocation",
          value: allocationSummaryData?.smallestAllocation
            ? `${allocationSummaryData.smallestAllocation.category} (${allocationSummaryData.smallestAllocation.percentage}%)`
            : "-"
        },
        {
          label: "Asset Classes",
          value: allocationSummaryData?.assetClasses || 0
        },
        {
          label: "Portfolio value",
          value: allocationSummaryData?.portfolioValue || 0
        }
      ]
    },

    ALL_ACTIVE: {
      cards: [
        {
          label: "Largest Allocation",
          value: allocationSummaryData?.largestAllocation
            ? `${allocationSummaryData.largestAllocation.category} (${allocationSummaryData.largestAllocation.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Allocation",
          value: allocationSummaryData?.smallestAllocation
            ? `${allocationSummaryData.smallestAllocation.category} (${allocationSummaryData.smallestAllocation.percentage}%)`
            : "-"
        },
        {
          label: "Asset Classes",
          value: allocationSummaryData?.assetClasses || 0
        },
        {
          label: "Active Portfolio value",
          value: allocationSummaryData?.portfolioValue || 0
        }
      ]
    },

    ALL_SOLD: {
      cards: [
        {
          label: "Largest Exit Allocation",
          value: allocationSummaryData?.largestAllocation
            ? `${allocationSummaryData.largestAllocation.category} (${allocationSummaryData.largestAllocation.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Exit Allocation",
          value: allocationSummaryData?.smallestAllocation
            ? `${allocationSummaryData.smallestAllocation.category} (${allocationSummaryData.smallestAllocation.percentage}%)`
            : "-"
        },
        {
          label: "Asset Classes Sold",
          value: allocationSummaryData?.assetClasses || 0
        },
        {
          label: "Total Sale value",
          value: allocationSummaryData?.portfolioValue || 0
        }
      ]
    },

    STOCK_ALL: {
      cards: [
        {
          label: "Largest Holding",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Holding",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Stock Holding",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Stock Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    STOCK_ACTIVE: {
      cards: [
        {
          label: "Largest Holding",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Holding",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Active Stocks",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Current Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    STOCK_SOLD: {
      cards: [
        {
          label: "Largest Exit",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Exit",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Sold Stocks",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Sale Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    MUTUAL_FUND_ACTIVE: {
      cards: [
        {
          label: "Largest Fund ",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Fund",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Active Funds",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Current Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    MUTUAL_FUND_ALL: {
      cards: [
        {
          label: "Largest Fund ",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Fund",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Fund Holdings",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Fund Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]

    },

    MUTUAL_FUND_SOLD: {
      cards: [
        {
          label: "Largest Redemption",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Redemption",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Redeemed Funds",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Redemption Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    FD_ALL: {
      cards: [
        {
          label: "Largest FD",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest FD",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "FD Holdings",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "FD Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    FD_ACTIVE: {
      cards: [
        {
          label: "Largest FD",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest FD",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Active FDs",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Current Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    FD_SOLD: {
      cards: [
        {
          label: "Largest Maturity",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Maturity",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Closed FDs",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Maturity Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    ETF_ALL: {
      cards: [
        {
          label: "Largest ETF",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest ETF",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "ETF Holdings",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "ETF Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    ETF_ACTIVE: {
      cards: [
        {
          label: "Largest ETF",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest ETF",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Active ETFs",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Current Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    ETF_SOLD: {
      cards: [
        {
          label: "Largest ETF",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest ETF",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Sold ETFs",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Sale Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    GOLD_ALL: {
      cards: [
        {
          label: "Largest Gold Holding",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Gold Holding",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Gold Holdings",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Gold Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    GOLD_ACTIVE: {
      cards: [
        {
          label: "Largest Gold Holding",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Gold Holding",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Active Gold Assets",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Current Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    GOLD_SOLD: {
      cards: [
        {
          label: "Largest Gold Exit",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Gold Exit",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Sold Gold Asset",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Sale Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    BOND_ALL: {
      cards: [
        {
          label: "Largest Bond",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Bond",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Bond Holdings",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Bond Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    BOND_ACTIVE: {
      cards: [
        {
          label: "Largest Bond",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Bond",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Active Bonds",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Current Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    },

    BOND_SOLD: {
      cards: [
        {
          label: "Largest Redemption",
          value: allocationSummaryData?.largestHolding
            ? `${allocationSummaryData.largestHolding.category} (${allocationSummaryData.largestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Smallest Redemption",
          value: allocationSummaryData?.smallestHolding
            ? `${allocationSummaryData.smallestHolding.category} (${allocationSummaryData.smallestHolding.percentage}%)`
            : "-"
        },
        {
          label: "Redeemed Bonds",
          value: allocationSummaryData?.totalHoldings || 0
        },
        {
          label: "Maturity Value",
          value: allocationSummaryData?.totalValue || 0
        }
      ]
    }

  }

  console.log("Type:", selectType);
  console.log("Status:", selectStatus);
  console.log("Key:", `${selectType}_${selectStatus}`);

  const currentConfig = analyticsConfig[`${selectType}_${selectStatus}`]
  const currentPerformaceList = performanceListConfig[`${selectType}_${selectStatus}`]
  const currentSummaryCards = allocationSummaryConfig[`${selectType}_${selectStatus}`]
  // console.log(currentConfig)
  console.log(analyticsConfig["ETF_ALL"]);
  const handleAddInvestment = async (e) => {

    e.preventDefault()

    const token = localStorage.getItem("token")

    const response = await createInvestment(investmentData, token)

    setShowInvestmentModal(false)

    setInvestmentData({
      assetType: "STOCK",
      assetName: "",
      assetSymbol: "",
      investedAmt: "",
      quantity: "",
      purchaseDate: "",
      // currentValue: "",
      investmentStatus: "ACTIVE",
      // notes: ""
    })

  }

  const fetchInvestments = async () => {

    try {

      const token = localStorage.getItem("token")
      const response = await getInvestment(token)
      const analytics = await getInvestmentAnalytics(token, selectType, selectStatus)
      setInvestments(response.data.data)
      console.log(analytics.data.data)

      setAnalyticsData(analytics.data.data)

      const performanceList = await getPerformanceListAnalytics(token, selectType, selectStatus)
      setperformanceListData(performanceList.data.data)
      console.log(performanceList.data.data)

      const stocksHolding = await getStocksHoldings(token)
      setstocksHoldingData(stocksHolding.data.data)
      console.log(stocksHolding.data.data)

      const allocation = await getInvestmentAllocation(token, selectType, selectStatus)
      setChartData(allocation.data.data.chart)
      console.log(allocation.data.data)
      setAllocationSummaryData(allocation.data.data)

      const insights = await getInsights(token)
      console.log("insights" ,insights.data.data)
      setInsightsData(insights.data.data)
      

      const holdingCounts = await getHoldingCount(token)
      setHoldingCounts(holdingCounts.data.data)
      console.log(holdingCounts.data.data)
   




    } catch (error) {
      console.log(error.message)

    }

  }

  useEffect(() => {

    fetchInvestments()

  }, [selectStatus, selectType])

  stocksHoldingData.map((data) => {
    console.log(data.assetName);

  })
 
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

                        {investmentData.assetType === "STOCK" &&
                          <div className="form_group">

                            <label>

                              Asset Symbol

                            </label>


                            <input
                              type="text"
                              value={investmentData.assetSymbol}
                              onChange={(e) => {
                                setInvestmentData({
                                  ...investmentData,
                                  assetSymbol: e.target.value
                                })
                              }}
                            />

                          </div>

                        }
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

                        {(investmentData.assetType === "STOCK" || investmentData.assetType === "ETF") &&
                          <div className="form_group">
                            <label>
                              Quantity
                            </label>

                            <input
                              type="number"
                              value={investmentData.quantity}
                              onChange={(e) => {
                                setInvestmentData({
                                  ...investmentData,
                                  quantity: e.target.value
                                })
                              }}
                            />

                          </div>
                        }

                        <div className="form_group">
                          <label>
                            Purcahe Date
                          </label>

                          <input
                            type="date"
                            value={investmentData.purchaseDate}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                purchaseDate: e.target.value
                              })
                            }}
                          />
                        </div>


                        {/* <div className="form_group">
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

                        </div> */}

                        <div className="form_group">
                          <label>

                            Status

                          </label>
                          <select
                            value={investmentData.investmentStatusv}
                            onChange={(e) => {
                              setInvestmentData({
                                ...investmentData,
                                investmentStatus: e.target.value
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


                      {
                        Investments.filter((investment) => {
                          const typeMatch =
                            selectType === "ALL" ||
                            investment.assetType === selectType

                          const statusMatch =
                            selectStatus === "ALL" ||
                            investment.investmentStatus === selectStatus;

                          return typeMatch && statusMatch
                        })
                          .map((investment) => (
                            <div
                              key={investment._id}
                              className="transaction_row">

                              <p>{investment.purchaseDate}</p>
                              <span className="category_tag">
                                {investment.assetType}
                              </span>

                              <p className="amount_text">
                                {investment.assetName}
                              </p>

                              <p>{investment.investedAmt}</p>
                              <p>{investment.investmentStatus}</p>

                            </div>
                          ))
                      }


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

                        {
                          holdingCounts.map((count,index) => (
                            <div className="performance_analytical_card" key={index}>
                              <div className="performance_analytical_card_label card_label">
                                <h4>{holdingCounts[index].assetType}</h4>
                              </div>

                              <div className='performance_analytical_card_label card_value' >

                                {holdingCounts[index].holdings} Holding
                              </div>

                            </div>
                          ))
                        }



                        

                    


                      </div>
                    }


                    {selectType === "STOCK" &&
                      <div className="stock_holding">
                        <div className="stock_holding_heading">
                          <h3>Stock Holdings</h3>


                        </div>

                        <div className="stock_list">

                          {stocksHoldingData.map((stock) => (



                            <div className="stock" key={stock._id}>
                              <h4> {stock.assetName}</h4>
                              <p>₹ 5000 hold</p>
                            </div>

                          ))
                          }


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
                    <AllocationChart
                      title="Portfolio Allocation"
                      data={chartData}
                      total={totalInvestment}
                    />


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
                <Insights
                 data ={insightsData}
                />
                

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Investment