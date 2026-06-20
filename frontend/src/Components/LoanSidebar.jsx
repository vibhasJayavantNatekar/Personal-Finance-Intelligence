import React from 'react'

const LoanSidebar = ( { view , setview , selectType , setselectType , selectStatus , setselectStatus  , selectTPP , setselectTPP } ) => {
    return (

        <>


            <div className="section_sidebar_wrapper">
                <div className="section_sidebar_container">
                    <div className="section_sidebar_section">



                        <div className="view_mode">

                            <h3 className="view_mode_heading">View Mode</h3>


                            <div className="view_mode_items">
                                {/* <h4 className="view_mode_item active_view_mode_item" > List  </h4> */}
                                <h4 className={`view_mode_item ${view === "List" ? "active_view_mode_item" : ""}` } 
                                onClick={()=>{ setview("List") }}
                                > List
                                </h4>

                                <h4 className={` view_mode_item ${view === "Analytical" ? "active_view_mode_item":""}` }
                                onClick={()=>{setview("Analytical")}}
                                >
                                    Analytical
                                </h4>

                                <h4 className={` view_mode_item ${view === "Allocation" ? "active_view_mode_item":""}` }
                                onClick={()=>{setview("Allocation")}}
                                >
                                    Allocation
                                </h4>

                            </div>



                        </div>

                        <div className="section_sidebar_dropdown">

                            <h3 className="section_sidebar_dropdown_heading">
                                Loan Type
                            </h3>
                         

                            <select className="section_sidebar_dropdown_options"
                              value={selectType}
                              onChange={
                                (e)=> setselectType(e.target.value)
                              }

                            >

                                <option value={"ALL"}>All Loan</option>
                                <option value={"PERSONAL"}>Personal Loan</option>
                                <option value={"HOME"}>Home Loan</option>
                                <option value={"EDUCATION"}>Education Loan</option>

                            </select>

                        </div>

                        <div className="section_sidebar_dropdown">

                            <h3 className="section_sidebar_dropdown_heading">
                                Status
                            </h3>

            
                            <select className="section_sidebar_dropdown_options"
                             value={selectStatus}
                             onChange={
                                (e)=> setselectStatus(e.target.value)
                             }
        

                            >

                                <option value={"ALL"}>All Status</option>
                                <option value={"ACTIVE"}>Active</option>
                                <option value={"COMPLETED"}>Completed</option>


                            </select>

                        </div>

                        <div className="section_sidebar_dropdown">

                            <h4 className="section_sidebar_dropdown_heading">
                                Transation Per Page
                            </h4>

                            <select className="section_sidebar_dropdown_options"
                              value={selectTPP}
                              onChange={
                                (e)=> setselectTPP(e.target.value)
                              }

                            >

                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>


                            </select>

                        </div>


                        

                        {/* <div className="section_sidebar_month_filter">
                            <div className="month_list">

                                <div className="month_filter_item active_month_filter_item "  >Jan 2026</div>


                            </div>
                        </div> */}



                    </div>
                </div>
            </div>




        </>
    )
}

export default LoanSidebar