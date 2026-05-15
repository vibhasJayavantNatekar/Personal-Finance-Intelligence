import React from 'react'
import '../Componets/Sidebar.css'

const Sidebar = () => {
  return (
<>

<div className="sidebar_wrapper">
    <div className="sidebar_container">
        <div className="sidebar_itemContainer">
            <ul>
                <li>Dashboard </li>
                <li>Expenses</li>
                <li>Loan</li>
                <li>Investments</li>
                <li>Logout</li>
            </ul>
        </div>
    </div>
</div>

</>

  )
}

export default Sidebar