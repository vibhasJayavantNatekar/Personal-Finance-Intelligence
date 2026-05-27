import React, { useState } from 'react'
import '../Componets/InvestmentSidebar.css'
const InvestmentSidebar = () => {



            

  return (


     <>
     
     <div className="investments_sidebar">

    {/* View Mode */}

    <div className="sidebar_section">

        <h4>View Mode</h4>

        <div className="sidebar_items">

            <div className="sidebar_item active_item">
                Table View
            </div>

            <div className="sidebar_item">
                Analytics View
            </div>

            <div className="sidebar_item">
                Allocation View
            </div>

        </div>

    </div>



    {/* Asset Filter */}

    <div className="sidebar_section">

        <h4>Asset Type</h4>

        <select className="sidebar_select">

            <option>All Assets</option>
            <option>Stocks</option>
            <option>Mutual Funds</option>
            <option>ETF</option>
            <option>Gold</option>
            <option>FD</option>
            <option>Bonds</option>

        </select>

    </div>



    {/* Status */}

    <div className="sidebar_section">

        <h4>Status</h4>

        <select className="sidebar_select">

            <option>All</option>
            <option>Active</option>
            <option>Sold</option>

        </select>

    </div>



    {/* Sort */}

    <div className="sidebar_section">

        <h4>Sort By</h4>

        <select className="sidebar_select">

            <option>Highest Returns</option>
            <option>Lowest Returns</option>
            <option>Newest Investment</option>
            <option>Oldest Investment</option>

        </select>

    </div>



    {/* Transaction Per page */}

    <div className="sidebar_section">

        <h4>Transactions Per Page</h4>

        <select className="sidebar_select">

            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>

        </select>

    </div>

</div>

     </>

  )
}

export default InvestmentSidebar