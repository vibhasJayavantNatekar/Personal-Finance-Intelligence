import React from 'react'
import Sidebar from '../Componets/Sidebar'
import Navbar from '../Componets/Navbar'

const Dashboard = () => {
  return (
    <>
 <div className="dashboard_wrapper">

    <Sidebar />

    <div className="main_section">

        <Navbar />

        <div className="dashboard_content">

         

        </div>

    </div>

</div>

    </>
  )
}

export default Dashboard