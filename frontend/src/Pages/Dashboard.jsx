import React from 'react'
import Sidebar from '../Componets/Sidebar'
import Navbar from '../Componets/Navbar'
import Card from '../Componets/Card'
import { } from 'react-icons'
import { FaExpeditedssl } from 'react-icons/fa'
import Exp from '../assets/icons/exp.png'

const Dashboard = () => {

  const now = new Date();
  const monthName = new Date().toLocaleString('en-US', { month: 'long' });
  console.log(monthName); // "May"


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
           
           <Card/>





          </div>

        </div>

      </div>

    </>
  )
}

export default Dashboard