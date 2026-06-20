import React, { useState } from 'react'
import '../Styles/Expenses.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import ExpensesSidebar from '../Components/ExpensesSidebar'
import { useSearchParams } from 'react-router-dom'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import AllocationChart from '../Components/AllocationChart'

const Expenses = () => {

  const [ShowExpensesModal, setShowExpensesModal] = useState(false)
  const [setviewmode, setSetviewmode] = useState('List')
  const [expensesType, setExpensesType] = useState('All')
  const [month, setMonth] = useState('Jan 2026')
  const [selectedType, setSelectedType] = useState('All')
  const [selectTPP, setselectTPP] = useState("10")

  const [expenseData, setExpenseData] = useState({

    amt: "",
    category: "",
    date: ""


  })

  const handleAddExpense = async (e) => {
    e.preventDefault()

    alert("Entry Added")

    setShowExpensesModal(false)

    setExpenseData({
      amt: "",
      category: "",
      date: ""
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

  const chartData = [

    {
      category: "Food",
      amount: 5000
    },

    {
      category: "Travel",
      amount: 3000
    },

    {
      category: "Bills",
      amount: 2000
    },

    {
      category: "Shopping",
      amount: 1500
    }

  ]

 

  const totalExpense = chartData.reduce(
    (sum, item) => sum + item.amount,
    0
  )



  const year = 2026

  const monthno = 4
  // May because January = 0

  const totalDays =
    new Date(year, monthno + 1, 0).getDate()

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


                    <div className="exp_transaction_row transaction_row">

                      <p>24 May 2026</p>
                      <span className="category_tag">
                        Food
                      </span>

                      <p className="amount_text">
                        ₹450
                      </p>

                      <p>Purchse</p>

                    </div>


                    <div className="exp_transaction_row transaction_row">

                      <p>23 May 2026</p>

                      <span className="category_tag">
                        Travel
                      </span>

                      <p className="amount_text">
                        ₹780
                      </p>

                      <p>Purchse</p>



                    </div>


                    <div className="exp_transaction_row transaction_row">

                      <p>22 May 2026</p>

                      <span className="category_tag">
                        Entertainment
                      </span>

                      <p className="amount_text">
                        ₹499
                      </p>

                      <p>Purchse</p>




                    </div>

                  </div>

                </div>

              }

              {setviewmode === "Calendar" &&
                <div className="calendar_grid">

                  {

                    Array.from(
                      { length: totalDays },

                      (_, index) => (

                        <div
                          className="calendar_day"
                          key={index}
                        >

                          <span className="day_number">

                            {index + 1}

                          </span>

                          <div className="day_expense">

                            ₹450

                          </div>

                        </div>

                      )

                    )

                  }

                </div>
              }

              {setviewmode === "Analytical" &&
                <div className="analytical_view">

                  <div className="analytical_card_container card_container">

                    <div className="analytical_card card">

                      <p className='analytical_card_label card_label'>Highest Expenses</p>

                      <h3 className="analytical_card_values card_value" >Rent (2000)</h3>

                    </div>

                    <div className="analytical_card card">

                      <p className='analytical_card_label card_label'>Lowest Expense</p>

                      <h3 className="analytical_card_values card_value" >₹300(Food)</h3>

                    </div>
                    {selectedType === "All" &&
                      <div className="analytical_card card">

                        <p className='analytical_card_label card_label'>Average Expense</p>

                        <h3 className="analytical_card_values card_value" >₹900</h3>

                      </div>
                    }
                    {selectedType === "All" &&
                      <div className="analytical_card card">

                        <p className='analytical_card_label card_label'>Most Used Category</p>

                        <h3 className="analytical_card_values card_value" > Food </h3>

                      </div>
                    }
                    {selectedType !== "All" &&
                      <div className="analytical_card card">

                        <p className='analytical_card_label card_label'>Total Spending</p>

                        <h3 className="analytical_card_values card_value" > ₹1500 </h3>

                      </div>

                    }
                    {selectedType !== "All" &&
                      <div className="analytical_card card">

                        <p className='analytical_card_label card_label'>{selectedType} Transactions</p>

                        <h3 className="analytical_card_values card_value" > 5 </h3>

                      </div>

                    }

                  </div>

                

                  <AllocationChart
                    title="Expense Distribution"
                    data={chartData}
                    total={totalExpense}
                  />

                </div>


              }



            </div>


          </div>




        </div>

      </div>

    </div >
  )
}

export default Expenses