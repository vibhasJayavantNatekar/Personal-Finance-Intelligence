import React from 'react'
import '../Styles/Profile.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'

const Profile = () => {
  return (
    <>
      <div className="section_wrapper">

        <Sidebar />

        <div className="main_section">

          <Navbar />

          <div className="section_content">



             <div className="profile_header">

    <div className="profile_avatar">
        VN
    </div>

    <div className="profile_info">
        <h2>Vibhas Natekar</h2>
        <p>vibhas@gmail.com</p>
    </div>

</div>

<div className="profile_card">

    <h3>Personal Information</h3>

    <div className="profile_grid">

        <div className="profile_field">
            <label>Full Name</label>
            <input type="text" value="Vibhas Natekar" />
        </div>

        <div className="profile_field">
            <label>Email</label>
            <input type="email" value="vibhas@gmail.com" />
        </div>

        <div className="profile_field">
            <label>Phone Number</label>
            <input type="text" value="9876543210" />
        </div>

        <div className="profile_field">
            <label>Occupation</label>
            <input type="text" value="Student" />
        </div>

    </div>

</div>

<div className="profile_card">

    <h3>Financial Profile</h3>

    <div className="profile_grid">

        <div className="profile_field">
            <label>Monthly Income</label>
            <input type="number" value="50000" />
        </div>

        <div className="profile_field">
            <label>Monthly Savings Goal</label>
            <input type="number" value="10000" />
        </div>

        <div className="profile_field">
            <label>Risk Appetite</label>

            <select>
                <option>Conservative</option>
                <option>Moderate</option>
                <option>Aggressive</option>
            </select>

        </div>

    </div>

</div>

<div className="profile_summary">

    <div className="summary_card">
        <p>Net Worth</p>
        <h3>₹2,50,000</h3>
    </div>

    <div className="summary_card">
        <p>Investments</p>
        <h3>₹4,00,000</h3>
    </div>

    <div className="summary_card">
        <p>Loans</p>
        <h3>₹1,00,000</h3>
    </div>

    <div className="summary_card">
        <p>Expenses</p>
        <h3>₹20,000</h3>
    </div>

</div>

<div className="profile_actions">

    <button>Save Changes</button>

    <button>Change Password</button>

    <button>Logout</button>

</div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Profile