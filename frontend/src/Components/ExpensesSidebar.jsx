import React from 'react'
import '../Styles/ExpensesSidebar.css'

const ExpensesSidebar = ({ view, setview, month, setmonth, selectedType, setSelectedType , TPP , setTPP }) => {
    return (
        <>
            <div className="section_sidebar_wrapper">
                <div className="section_sidebar_container">
                    <div className="section_sidebar_section">



                        <div className="view_mode">

                            <h3 className="view_mode_heading">View Mode</h3>


                            <div className="view_mode_items">
                                {/* <h4 className="view_mode_item active_view_mode_item" > List  </h4> */}
                                <h4 className={`view_mode_item  ${view === "List" ? "active_view_mode_item" : ""} `}
                                    onClick={() => { setview("List") }}
                                > List
                                </h4>

                                <h4 className={`view_mode_item  ${view === "Calendar" ? "active_view_mode_item" : ""} `}
                                    onClick={() => { setview("Calendar") }}
                                >
                                    Calendar
                                </h4>

                                  <h4 className={`view_mode_item  ${view === "Analytical" ? "active_view_mode_item" : ""} `}
                                    onClick={() => { setview("Analytical") }}
                                >
                                    Analytical
                                </h4>

                            </div>



                        </div>

                        <div className="section_sidebar_dropdown">

                            <h3 className="section_sidebar_dropdown_heading">
                                Expense Type
                            </h3>
                            

                            <select className="section_sidebar_dropdown_options"
                                value={selectedType}
                                onChange={(e) =>
                                    setSelectedType(e.target.value)
                                }
                            >
                             
                                <option value={"All"}>All Expenses</option>
                                <option value={"food"}>Food</option>
                                <option value={"travel"}>Travel</option>
                                <option value={"shopping"}>Shopping</option>
                                <option value={"bils"}>Bills</option>
                                <option value={"health"}>Health</option>

                            </select>

                        </div>

                   {view === "List" &&
                        <div className="section_sidebar_dropdown">

                            <h4 className="section_sidebar_dropdown_heading">
                                Transation Per Page
                            </h4>

                        

                            <select className="section_sidebar_dropdown_options" 
                               
                               value={TPP}
                               onChange={(e) => 
                                setTPP(e.target.value)
                               }

                            >

                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>


                            </select>

                        </div>
}

                        <div className="section_sidebar_month_filter">
                            <div className="month_list">

                                <div className={`month_filter_item ${month === "Jan 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Jan 2026") }}  >Jan 2026</div>
                                <div className={`month_filter_item ${month === "Feb 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Feb 2026") }}  >Feb 2026</div>


                                <div className={`month_filter_item ${month === "Mar 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Mar 2026") }}  >Mar 2026</div>

                                <div className={`month_filter_item ${month === "Apr 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Apr 2026") }}  >Apr 2026</div>

                                <div className={`month_filter_item ${month === "May 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("May 2026") }}  >May 2026</div>
                                <div className={`month_filter_item ${month === "Jun 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Jun 2026") }}  >Jun 2026</div>
                                <div className={`month_filter_item ${month === "Jul 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Jul 2026") }}  >Jul 2026</div>
                                <div className={`month_filter_item ${month === "Aug 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Aug 2026") }}  >Aug 2026</div>
                                <div className={`month_filter_item ${month === "Sep 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Sep 2026") }}  >Sep 2026</div>
                                <div className={`month_filter_item ${month === "Oct 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Oct 2026") }}  >Oct 2026</div>
                                <div className={`month_filter_item ${month === "Nov 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Nov 2026") }}  >Nov 2026</div>
                                <div className={`month_filter_item ${month === "Dec 2026" ? "active_month_filter_item" : ""} `} onClick={() => { setmonth("Dec 2026") }}  >Dec 2026</div>

                            </div>
                        </div>



                    </div>
                </div>
            </div>


        </>
    )
}

export default ExpensesSidebar