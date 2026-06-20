import React from 'react'
import Logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import '../Styles/Sidebar.css'
import {FaHome, FaWallet} from 'react-icons/fa'
const Sidebar = () => {
  return (

    <>
      <div className="sidebar_wrapper">
                <div className="sidebar_container">
                    <div className="sidebar_itemWrapper">

                        <div className="logo">
                             <img
                                src={Logo}
                                alt="Logo"
                            />
                        </div>

                        <div className="itemContainer">
                            <h3 className="itemCat">Overview</h3>
                            <ul>
                                <li>
                                    <NavLink to='/dash' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } > <span>  </span>Dashboard </NavLink>

                                </li>

                                <li>
                                    <NavLink to='/healthIn' className={({ isActive }) =>
                                        isActive ? "activeLink sidebarItem" : "sidebarItem"
                                    } >  Health Insights </NavLink>

                                </li>


                            </ul>

                        </div>

                        <div className="itemContainer">
                            <h3 className="itemCat">Finanace</h3>
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
                            <h3 className="itemCat">Tools</h3>
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
                            <h3 className="itemCat">Accout</h3>
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