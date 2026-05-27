import React, { useState } from 'react'
import Sidebar from '../Componets/Sidebar'
import Navbar from '../Componets/Navbar'
import '../Pages/Expenses.css'
import ExpensesSidebar from '../Componets/ExpensesSidebar'


const Expenses = () => {

  const [view, setView] = useState("list")


  const year = 2026

  const month = 4
  // May because January = 0

  const totalDays =
    new Date(year, month + 1, 0).getDate()


  return (

    <>



      <div className="section_wrapper">

        <Sidebar />

        <div className="main_section">

          <Navbar />

          <div className="section_content expenses_page">

            <div className="expenses_overview">

              <div className=" expenses_card">

                <div className=" expenses_card_item">
                  <div className="expenses_card_label">
                    <p>Today Expense</p>
                  </div>

                  <div className=" expense_value expenses_card_value ">
                    ₹1,250
                  </div>
                </div>

                <div className=" expenses_card_divider"></div>

                <div className=" expenses_card_item">
                  <div className="expenses_card_label">
                    <p>Highest Category</p>
                  </div>

                  <div className=" category_value expenses_card_value">
                    Food
                  </div>
                </div>

                <div className=" expenses_card_divider"></div>

                <div className=" expenses_card_item">
                  <div className="expenses_card_label ">
                    <p>This Month</p>
                  </div>

                  <div className=" expense_value expenses_card_value">
                    ₹32,000
                  </div>
                </div>

              </div>

            </div>

            <div className='expenses_workspace'>


              <div className='expenses_sidebar_container' >
                <ExpensesSidebar />

              </div>

              <div className="expenses_content">

                {/* Toolbar */}

                <div className="expenses_toolbar">

                  <div className="toolbar_left">

                    <h2>Expenses</h2>

                    <p>
                      Track and analyze your spending
                    </p>

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

                    <button className="add_expense_btn">
                      Add Expense
                    </button>

                  </div>

                </div>



                {/* Overview Strip */}

                {/* <div className="expenses_strip">

                  <div className="strip_item">

                    <p className="strip_label">
                      Today Expense
                    </p>

                    <h3 className="expense_value">
                      ₹1,250
                    </h3>

                  </div>


                  <div className="strip_divider"></div>


                  <div className="strip_item">

                    <p className="strip_label">
                      Highest Category
                    </p>

                    <h3 className="category_value">
                      Food
                    </h3>

                  </div>


                  <div className="strip_divider"></div>


                  <div className="strip_item">

                    <p className="strip_label">
                      This Month
                    </p>

                    <h3 className="expense_value">
                      ₹32,000
                    </h3>

                  </div>

                </div> */}



                {/* Transactions */}

             { view == "list" &&  <div className="expenses_transactions">

                  <div className="transactions_header">

                    <h3>Expense Transactions</h3>

                  </div>


                  <div className="transaction_table">

                    <div className="table_heading">

                      <p>Title</p>
                      <p>Category</p>
                      <p>Amount</p>
                      <p>Date</p>

                    </div>


                    <div className="transaction_row">

                      <p>Swiggy Order</p>

                      <span className="category_tag">
                        Food
                      </span>

                      <p className="amount_text">
                        ₹450
                      </p>

                      <p>24 May 2026</p>

                    </div>


                    <div className="transaction_row">

                      <p>Uber Ride</p>

                      <span className="category_tag">
                        Travel
                      </span>

                      <p className="amount_text">
                        ₹780
                      </p>

                      <p>23 May 2026</p>

                    </div>


                    <div className="transaction_row">

                      <p>Netflix</p>

                      <span className="category_tag">
                        Entertainment
                      </span>

                      <p className="amount_text">
                        ₹499
                      </p>

                      <p>22 May 2026</p>

                    </div>

                  </div>

                </div> 

             }

             { view == "calender" &&
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






                {/* Analytics */}

                <div className="expenses_analytics">

                  <div className="analytics_header">

                    <h3>Expense Analytics</h3>

                  </div>


                  <div className="analytics_placeholder">

                    Chart Section

                  </div>

                </div>



                {/* Insights */}

                <div className="spending_insights">

                  <div className="insights_header">

                    <h3>Spending Insights</h3>

                  </div>


                  <div className="insight_item">

                    <p>
                      Food spending increased 18% this month
                    </p>

                  </div>


                  <div className="insight_item">

                    <p>
                      Travel expenses are lower this week
                    </p>

                  </div>


                  <div className="insight_item">

                    <p>
                      Shopping expenses are higher than average
                    </p>

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

export default Expenses