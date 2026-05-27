import React from 'react'
import '../Componets/ExpensesSidebar.css'
import { NavLink } from 'react-router-dom'
const ExpensesSidebar = () => {

    

    return (
        <>

            <div className="expenses_sidebar_container">

                <div className="expenses_sidebar">


                    <div className="sidebar_section">

                        <h4 className="sidebar_heading">
                            View Mode
                        </h4>

                        <div className="view_mode_list">

                            <div className="view_mode_item active_view">
                                Expense List
                            </div>

                            <div className="view_mode_item">
                                Calendar
                            </div>

                            <div className="view_mode_item">
                                Gallery
                            </div>

                        </div>

                    </div>



                    <div className="sidebar_section">

                        <h4 className="sidebar_heading">
                            Expense Type
                        </h4>

                        <select className="sidebar_select">

                            <option>All Expenses</option>
                            <option>Food</option>
                            <option>Travel</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                            <option>Health</option>

                        </select>

                    </div>



                    <div className="sidebar_section">

                        <h4 className="sidebar_heading">
                            Transactions Per Page
                        </h4>

                        <select className="sidebar_select">

                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>

                        </select>

                    </div>



                    <div className="sidebar_section">

                        <div className="month_filter_list">

                            <div className="month_filter_item active_month">
                                May 2026
                            </div>

                            <div className="month_filter_item">
                                Apr 2026
                            </div>

                            <div className="month_filter_item">
                                Mar 2026
                            </div>

                            <div className="month_filter_item">
                                Feb 2026
                            </div>

                            <div className="month_filter_item">
                                Jan 2026
                            </div>

                            <div className="month_filter_item custom_filter">
                                Custom Range
                            </div>

                        </div>

                    </div>


                </div>

            </div>

        </>
    )
}

export default ExpensesSidebar