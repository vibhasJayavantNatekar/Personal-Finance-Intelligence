import React from 'react'
import Sidebar from '../Componets/Sidebar'
import Navbar from '../Componets/Navbar'
import InvestmentSidebar from '../Componets/InvestmentSidebar'
import { useState } from 'react'

const Investment = () => {

  const [view, setView] = useState('list')

  return (

    <>

      <div className="section_wrapper">

        <Sidebar />

        <div className="main_section">

          <Navbar />

          <div className="section_content">

            <div className="investments_page">

              {/* OVERVIEW */}

              <div className="investments_overview">

                <div className="investment_strip">

                  <div className="investment_strip_item">

                    <p>Total Investment</p>

                    <h3>₹4,80,000</h3>

                  </div>


                  <div className="strip_divider"></div>


                  <div className="investment_strip_item">

                    <p>Current Value</p>

                    <h3 className="positive_text">
                      ₹5,24,000
                    </h3>

                  </div>


                  <div className="strip_divider"></div>


                  <div className="investment_strip_item">

                    <p>Total Profit</p>

                    <h3 className="positive_text">
                      ↑ +₹44,000
                    </h3>

                  </div>


                  <div className="strip_divider"></div>


                  <div className="investment_strip_item">

                    <p>Active Assets</p>

                    <h3>12</h3>

                  </div>

                </div>

              </div>



              {/* WORKSPACE */}

              <div className="investments_workspace">

                <InvestmentSidebar />



                <div className="investments_content">


                  {/* TOOLBAR */}

                  <div className="investments_toolbar">

                    <div className="toolbar_left">

                      <h2>Investments</h2>

                      <p>
                        Track and manage your portfolio
                      </p>

                    </div>


                    <div className="toolbar_right">

                      <input
                        type="text"
                        placeholder="Search assets"
                        className="investment_search"
                      />

                      <button className="import_statement_btn">

                        Import Statement

                      </button>
                      <button className="add_asset_btn">

                        Add Investment

                      </button>

                    </div>

                  </div>



                  {/* LIVE MARKET */}

                  <div className="live_market_strip">

                    <div className="market_item gain">

                      <h5>TCS</h5>

                      <p>↑ +2.4%</p>

                    </div>


                    <div className="market_item loss">

                      <h5>Gold ETF</h5>

                      <p>↓ -1.2%</p>

                    </div>


                    <div className="market_item gain">

                      <h5>INFY</h5>

                      <p>↑ +4.8%</p>

                    </div>


                    <div className="market_item gain">

                      <h5>FD</h5>

                      <p>↑ +6%</p>

                    </div>

                  </div>



                  {/* Investment List */}


                  {view == "list" &&
                    <div className="investments_table">

                      <div className="table_header">

                        <p>Asset</p>
                        <p>Type</p>
                        <p>Invested</p>
                        <p>Status</p>
                        <p>ROI</p>

                      </div>



                      <div className="table_row">

                        <p>TCS</p>

                        <p>STOCK</p>

                        <p>₹25,000</p>

                        <p className="active_status">
                          ACTIVE
                        </p>

                        <p className="positive_text">
                          ↑ +12%
                        </p>

                      </div>



                      <div className="table_row">

                        <p>Gold ETF</p>

                        <p>ETF</p>

                        <p>₹12,000</p>

                        <p className="active_status">
                          ACTIVE
                        </p>

                        <p className="negative_text">
                          ↓ -2%
                        </p>

                      </div>

                    </div>

                  }

                  {
                    view == "Analytics" &&
                    <div>

                      Analytics
                    </div>
                  }

                  {
                    view == "Allocation" &&
                    <div>
                      Allocation View
                    </div>
                  }



                  {/* ALLOCATION CHART */}

                  <div className="allocation_chart">

                    <h3>Portfolio Allocation</h3>

                    <div className="chart_placeholder">

                      Allocation Chart

                    </div>

                  </div>



                  {/* PERFORMANCE ANALYTICS */}

                  <div className="performance_analytics">

                    <h3>Performance Analytics</h3>

                    <div className="analytics_cards">

                      <div className="analytics_card">

                        <p>Total ROI</p>

                        <h2 className="positive_text">
                          +12.4%
                        </h2>

                      </div>


                      <div className="analytics_card">

                        <p>Best Asset</p>

                        <h2>TCS</h2>

                      </div>


                      <div className="analytics_card">

                        <p>Total Profit</p>

                        <h2 className="positive_text">
                          ₹44,000
                        </h2>

                      </div>

                    </div>

                  </div>



                  {/* INSIGHTS */}

                  <div className="investment_insights">

                    <h3>Investment Insights</h3>

                    <div className="insight_card">

                      <p>
                        Stocks contributed highest returns this month.
                      </p>

                    </div>


                    <div className="insight_card">

                      <p>
                        Gold reduced overall portfolio volatility.
                      </p>

                    </div>

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