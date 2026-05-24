import React from 'react'
import Sidebar from '../Componets/Sidebar'
import Navbar from '../Componets/Navbar'
import Card from '../Componets/Card'
import { } from 'react-icons'
import { FaExpeditedssl } from 'react-icons/fa'
import Exp from '../assets/icons/exp.png'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Live_market_strip from '../Componets/Live_market_strip'

const Dashboard = () => {

  const now = new Date();
  const monthName = new Date().toLocaleString('en-US', { month: 'long' });
  console.log(monthName); // "May"

  const data = [
    {
      month: "Jan",
      income: 4000,
      expense: 2400,
    },
    {
      month: "Feb",
      income: 3000,
      expense: 1398,
    },
    {
      month: "Mar",
      income: 5000,
      expense: 3200,
    },
    {
      month: "Apr",
      income: 2780,
      expense: 2000,
    },
    {
      month: "May",
      income: 1890,
      expense: 3800,
    },
  ];


  return (
    <>
      <div className="section_wrapper">

        <Sidebar />

        <div className="main_section">

          <Navbar />

          <div className="section_content">

            <div className="top_part">
              <div className="expense_card">

                <div className="expense_left">

                  <div className="expense_heading">

                    <div className="heading_left">
                      <h2>May</h2>
                      <span>Expense</span>
                    </div>

                    <div className="refresh_icon">
                      ↻
                    </div>

                  </div>

                  <div className="expense_amount">
                    ₹ 32,000
                  </div>

                  <div className="monthly_income">
                    Monthly Income
                    <span> ₹ 50,000</span>
                  </div>

                  <button className="details_btn">
                    View Details
                  </button>

                </div>

                <div className="expense_right">

                  <div className="expense_icon">
                    <img src={Exp} alt="expense icon" />
                  </div>

                </div>

              </div>


              <div className="financial_summary">

                <div className="summary_heading">
                  <h2>Financial Summary</h2>
                  <p>Your overall financial overview</p>
                </div>

                <div className="summary_items">

                  <div className="summary_item">

                    <div className="summary_icon assets_icon">
                      💰
                    </div>

                    <div className="summary_content">
                      <p>Total Assets</p>
                      <h3>₹4,85,000</h3>
                    </div>

                  </div>

                  <div className="summary_item">

                    <div className="summary_icon liabilities_icon">
                      💳
                    </div>

                    <div className="summary_content">
                      <p>Total Liabilities</p>
                      <h3>₹1,20,000</h3>
                    </div>

                  </div>

                  <div className="summary_item">

                    <div className="summary_icon worth_icon">
                      🏦
                    </div>

                    <div className="summary_content">
                      <p>Net Worth</p>
                      <h3>₹3,65,000</h3>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            <Live_market_strip/>

            <div className="second_part">


              <div className="stats_cards_container">

                <div className="stats_card">

                  <div className="stats_top">

                    <div className="stats_heading">

                      <div className="stats_icon">
                        📅
                      </div>

                      <h3>Today</h3>

                    </div>

                    <div className="stats_menu">
                      ⋮
                    </div>

                  </div>

                  <div className="stats_middle">

                    <h2 className="expense_text">
                      ₹ 0.00
                    </h2>

                    <h3 className="income_text">
                      ₹ 0.00
                    </h3>

                  </div>

                  <div className="stats_bottom">
                    <p>May 22, 2026</p>
                  </div>

                </div>



                <div className="stats_card">

                  <div className="stats_top">

                    <div className="stats_heading">

                      <div className="stats_icon">
                        📆
                      </div>

                      <h3>This Week</h3>

                    </div>

                    <div className="stats_menu">
                      ⋮
                    </div>

                  </div>

                  <div className="stats_middle">

                    <h2 className="expense_text">
                      ₹ 8,500
                    </h2>

                    <h3 className="income_text">
                      ₹ 2,500
                    </h3>

                  </div>

                  <div className="stats_bottom">
                    <p>May 17 - May 23</p>
                  </div>

                </div>



                <div className="stats_card">

                  <div className="stats_top">

                    <div className="stats_heading">

                      <div className="stats_icon">
                        🗓
                      </div>

                      <h3>This Month</h3>

                    </div>

                    <div className="stats_menu">
                      ⋮
                    </div>

                  </div>

                  <div className="stats_middle">

                    <h2 className="expense_text">
                      ₹ 32,000
                    </h2>

                    <h3 className="income_text">
                      ₹ 12,000
                    </h3>

                  </div>

                  <div className="stats_bottom">
                    <p>May 1 - May 31</p>
                  </div>

                </div>




                <div className="stats_card">

                  <div className="stats_top">

                    <div className="stats_heading">

                      <div className="stats_icon">
                        📊
                      </div>

                      <h3>This Year</h3>

                    </div>

                    <div className="stats_menu">
                      ⋮
                    </div>

                  </div>

                  <div className="stats_middle">

                    <h2 className="expense_text">
                      ₹ 1,20,000
                    </h2>

                    <h3 className="income_text">
                      ₹ 58,000
                    </h3>

                  </div>

                  <div className="stats_bottom">
                    <p>2026</p>
                  </div>

                </div>

              </div>

              <div className="chart_container">

                <h2>Income and Expense Trends</h2>

                <ResponsiveContainer width="100%" height={300}>

                  <LineChart data={data}>

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#FF4D4D"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#00C9A7"
                      strokeWidth={3}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>





          </div>

        </div>

      </div>

    </>
  )
}

export default Dashboard