import React from 'react'
import { FaMoon, FaUserCircle } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import '../Styles/Navbar.css'

const Navbar = () => {
  return (
   <>
     <nav className="navbar">

                <div className="navbar_left">


                </div>

                <div className="navbar_right">

                    <button className="theme_btn">
                        <FaMoon />
                    </button>

                    <div className="profile_section">

                         <FaUserCircle/>

                        

                    </div>

                    <button className="logout_btn">
                        <FiLogOut />
                        Logout
                    </button>

                </div>

            </nav>
   </>
  )
}

export default Navbar