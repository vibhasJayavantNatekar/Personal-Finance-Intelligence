import React, { useEffect, useState } from 'react'
import '../Styles/Expenses.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import ExpensesSidebar from '../Components/ExpensesSidebar'
import { useSearchParams } from 'react-router-dom'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { createExpense, getExpenses, deleteExpenses, updateExpenses, getExpensesAllocation, getExpensesAnalytics, getExpensesCalender, getExpensesInsights } from '../Api/expensesApi'
import AllocationChart from '../Components/AllocationChart'
import Insights from '../Components/insights'

const Expenses = () => {

  const [ShowExpensesModal, setShowExpensesModal] = useState(false)
  const [setviewmode, setSetviewmode] = useState('List')
  const [expensesType, setExpensesType] = useState('ALL')
  const [month, setMonth] = useState('All')
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectTPP, setselectTPP] = useState("10")

  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState("")
  const [expenseData, setExpenseData] = useState({

    amt: "",
    category: "food",
    date: ""


  })
  const [chartData, setchartData] = useState([])
  const [totalExpense, setTotalExpense] = useState(0)
  const [analyticsData, setanalyticsData] = useState([])
  const [expensesCalenderData, setExpensesCalenderData] = useState([])
  const [insightsData, setInsightsData] = useState([])

  const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  }
  const currentDate = new Date()

  const [getMonth, getYear] = month.split(" ")

  const daysInMonth = new Date(getYear || currentDate.getFullYear(), months[getMonth] || currentDate.getMonth() + 1, 0).getDate()
  console.log(daysInMonth)

  console.log("VIEW MODE:", setviewmode)

  
 
  const fetchExpenses = async () => {

    try {



      const token = localStorage.getItem("token")

      console.log(getYear)

      const response = await getExpenses(token)
      console.log(selectedType, months[getMonth], getYear)

      const allocation = await getExpensesAllocation(token, selectedType.toUpperCase(), months[getMonth], getYear)
      const analytics = await getExpensesAnalytics(token, selectedType, months[getMonth], getYear)
      const insights = await getExpensesInsights(token)
      const expensesCalender = await getExpensesCalender(token, selectedType, months[getMonth], getYear)
      console.log(allocation.data.data.totalExpense)
      
      setanalyticsData(analytics.data.data)
      setchartData(allocation.data.data?.chart)
      setTotalExpense(allocation.data.data.totalExpense)
      setExpenses(response.data.data)
      setExpensesCalenderData(expensesCalender.data.data)
      setInsightsData(insights.data.data)


    } catch (error) {

      setError(error.response?.data?.message)

    }
  }




  const handleAddExpense = async (e) => {
    e.preventDefault()

    console.log(expenseData)

    const token = localStorage.getItem("token")

    const response = await createExpense(expenseData, token)

    console.log(response);


    alert("Entry Added")

    setShowExpensesModal(false)
    fetchExpenses()
    setExpenseData({
      amt: "",
      category: "food",
      date: ""
    })



  }



  const formatMonthYear = (date) => {

    return new Date(date).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric"
    })

  }


  const formatDate = (date) => {

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })

  }
  const COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EC4899",
    "#8B5CF6",
    "#EF4444",
    "#06B6D4"
  ]

  // const chartData = [

  //   {
  //     category: "Food",
  //     amount: 5000
  //   },

  //   {
  //     category: "Travel",
  //     amount: 3000
  //   },

  //   {
  //     category: "Bills",
  //     amount: 2000
  //   },

  //   {
  //     category: "Shopping",
  //     amount: 1500
  //   }

  // ]


  const isCurrentDay = (day) => {

    return currentDate.getDate() === day &&
      currentDate.getMonth() + 1 ===
      (months[getMonth] || currentDate.getMonth() + 1) &&
      currentDate.getFullYear() ===
      (Number(getYear) || currentDate.getFullYear())
  }


  useEffect(() => {

    fetchExpenses();

  }, [selectedType, month,])

  console.log(analyticsData)
  const analyticsConfig = {

    ALL: {

      cards: [

        {
          label: "Highest Expense",
          value: analyticsData?.highestExpense
            ? `₹${analyticsData.highestExpense.amt} (${formatDate(analyticsData.highestExpense.date)})`
            : "-"
        },

        {
          label: "Lowest Expense",
          value: analyticsData?.lowestExpense
            ? `₹${analyticsData.lowestExpense.amt} (${formatDate(analyticsData.lowestExpense.date)})`
            : "-"
        },

        {
          label: "Average Expense",
          value: `₹${analyticsData?.averageExpense || 0}`
        },

        {
          label: "Most Used Category",
          value: analyticsData?.mostUsedCategory || "-"
        }
      ]

    },



    CATEGORY: {

      cards: [

        {
          label: "Highest Expense",
          value: analyticsData?.highestExpense
            ? `₹${analyticsData.highestExpense.amt} (${formatDate(analyticsData.highestExpense.date)})`
            : "-"
        },

        {
          label: "Lowest Expense",
          value: analyticsData?.lowestExpense
            ? `₹${analyticsData.lowestExpense.amt} (${formatDate(analyticsData.lowestExpense.date)})`
            : "-"
        },

        {
          label: "Total Spending",
          value: `₹${analyticsData?.totalExpense || 0}`
        },

        {
          label: `${selectedType} Transactions`,
          value: analyticsData?.transactionCount || 0
        }

      ]

    }

  }

  const currentAnalytics = selectedType === "ALL" ? analyticsConfig.ALL : analyticsConfig.CATEGORY;

  return (
    <div className="section_wrapper">

      <Sidebar />

      <div className="main_section">

        <Navbar />

        <div className="section_content expenses_section">

          <div className="expenses_overview overview">
            <div className="expenses_overview_card overview_card">
              <div className="expenses_overview_card_label overview_card_label">
                <p>Total Expenses</p>
              </div>
              <div className="expenses_overview_card_values overview_card_values">
                $ 5000
              </div>
            </div>

            <div className="expenses_overview_card_divider overview_card_divider"></div>


            <div className="expenses_overview_card overview_card">
              <div className="expenses_overview_card_label overview_card_label">
                <p>Highest Category</p>
              </div>
              <div className="expenses_overview_card_values card_category_value overview_card_values ">
                Food
              </div>
            </div>

            <div className="expenses_overview_card_divider overview_card_divider "></div>



            <div className="expenses_overview_card overview_card">
              <div className="expenses_overview_card_label overview_card_label">
                <p>This Month</p>
              </div>
              <div className="expenses_overview_card_values overview_card_values">
                $ 5000
              </div>
            </div>


          </div>

          <div className="expenses_workspace">

            <div className="section_sidebar_container">
              <ExpensesSidebar
                view={setviewmode}
                setview={setSetviewmode}
                month={month}
                setmonth={setMonth}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                TPP={selectTPP}
                setTPP={setselectTPP}
              />
            </div>

            <div className="section_content">

              <div className="section_toolbar">
                <div className="toolbar_left">
                  <h2 className="toolbar_heading">
                    Expenses
                  </h2>

                  <p>Track and analyze your spending</p>
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
                    onClick={() => setShowExpensesModal(true)}>
                    Add Expense
                  </button>
                </div>
              </div>

              {ShowExpensesModal && (
                <div div className="modal_overlay">



                  <div className="modal">



                    {/* HEADER */}

                    <div className="modal_header">

                      <h2>

                        Add Expense

                      </h2>



                      <button
                        className="close_modal_btn"
                        onClick={() => setShowExpensesModal(false)}
                      >

                        ✕

                      </button>

                    </div>




                    {/* Form */}

                    <form className="form"
                      onSubmit={handleAddExpense}
                    >






                      <div className="form_group">

                        <label>

                          Amount

                        </label>



                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={expenseData.amt}
                          onChange={(e) =>

                            setExpenseData({

                              ...expenseData,

                              amt: e.target.value

                            })

                          }
                        />

                      </div>

                      <div className="form_group">

                        <label>

                          Category

                        </label>


                        <select
                          value={expenseData.category}
                          onChange={(e) =>

                            setExpenseData({

                              ...expenseData,

                              category: e.target.value

                            })

                          }
                        >

                          <option value="food">

                            Food

                          </option>

                          <option value="travel">

                            Travel

                          </option>

                          <option value="rent">

                            Rent

                          </option>

                        </select>

                      </div>

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

                      </div>



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

                          Save Expense

                        </button>

                      </div>

                    </form>

                  </div>

                </div>
              )}
              {setviewmode === "List" &&
                <div className="expenses_transactions">

                  <div className="transactions_header">

                    <h3>Expense Transactions</h3>

                  </div>


                  <div className="transaction_table">

                    <div className="exp_table_heading table_heading">

                      <p>Date</p>
                      <p>Category</p>
                      <p>Amount</p>
                      <p>Tags </p>


                    </div>



                    {
                      expenses
                        .filter((exp) => {

                          const categoryMatch =
                            selectedType === "ALL" ||
                            exp.category === selectedType;

                          const monthMatch =
                            month === "All" ||
                            formatMonthYear(exp.date) === month;

                          return categoryMatch && monthMatch;

                        })
                        .map((exp) => (
                          <div
                            key={exp._id}
                            className="exp_transaction_row transaction_row">

                            <p>{formatDate(exp.date)} </p>
                            <span className="category_tag">
                              {exp.category}
                            </span>

                            <p className="amount_text">
                              {exp.amt}
                            </p>

                            <p>Purchse</p>

                          </div>
                        ))
                    }


                  </div>

                </div>

              }

              {setviewmode === "Calendar" &&
                <div className="calendar_grid">

                  {


                    Array.from({ length: daysInMonth }, (_, day) => (

                      // console.log("its in");

                      <div
                        className={`calendar_day ${isCurrentDay(day + 1) ? "current_day" : ""}`}
                        key={day}
                      >



                        <span className="day_number">

                          {day + 1}

                        </span>


                        {
                          // currentDate.getDate()
                          expensesCalenderData.map((exp, index) => (
                            exp.day === day + 1 && (
                              <span className="day_expense">{`₹${exp.totalExpense}`}</span>
                            )


                          ))

                        }



                      </div>

                    ))

                  }
                </div>
              }

              {setviewmode === "Analytical" &&
                <div className="analytical_view">

                  <div className="analytical_card_container card_container">


                    {

                      currentAnalytics.cards.map((card, index) => (

                        <div
                          key={index}
                          className="analytical_card card"
                        >

                          <p className="analytical_card_label card_label">

                            {card.label}

                          </p>

                          <h3 className="analytical_card_values card_value">

                            {card.value}

                          </h3>

                        </div>

                      ))

                    }


                  </div>


                  {selectedType === "ALL" &&
                    <AllocationChart
                      title="Expense Distribution"
                      data={chartData}
                      total={totalExpense}
                    />
                  }
                </div>

                // <AllocationChart 

          
                // />


              }

              <Insights
                data={insightsData}
              />


            </div>


          </div>




        </div>

      </div>

    </div >
  )
}

export default Expenses