import React from 'react'
import '../Componets/Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>

            <div className="sidebar_wrapper">
                <div className="sidebar_container">
                    <div className="sidebar_itemWrapper">

                        <div className="logo">


                        </div>

                        <div className="itemContainer">
                            <h6 className="itemCat">Overview</h6>
                            <ul>
                                <li>
                                    <NavLink to='/dash' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } > Dashboard </NavLink>

                                </li>

                                <li>
                                    <NavLink to='/healthIn' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } >  Health Insights </NavLink>

                                </li>


                            </ul>

                        </div>

                        <div className="itemContainer">
                            <h6 className="itemCat">Finanace</h6>
                            <ul>

                                <li>
                                    <NavLink to='/expenses' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } >  Expenses </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/loan' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } > Loan </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/investments' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } > Investments </NavLink>

                                </li>
                            </ul>

                        </div>

                        <div className="itemContainer">
                            <h6 className="itemCat">Tools</h6>
                            <ul>

                                <li>
                                    <NavLink to='/sipCalc' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } >   Sip Calculator </NavLink>


                                </li>

                                <li>

                                    <NavLink to='/taxCalc' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } > Tax Calculator </NavLink>

                                </li>

                            </ul>

                        </div>

                        <div className="itemContainer">
                            <h6 className="itemCat">Accout</h6>
                            <ul>

                                <li>

                                    <NavLink to='/profile' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } >   Profile </NavLink>

                                </li>
                                <li>
                                    <NavLink to='/logout' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    }>    Log Out </NavLink>

                                </li>
                            </ul>

                        </div>




                    </div>
                </div>
            </div>

        </>

    )
}

export default Sidebar