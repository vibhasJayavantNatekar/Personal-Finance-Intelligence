import React from 'react'
import './Card.css'

const Card = () => {
  return (
    <>
    
   <div className="card">

    <div className="card_top">

        <div className="card_icon">
            📈
        </div>

        <div className="card_title">
            Portfolio Value
        </div>

    </div>

    <div className="card_middle">

        <h2>₹2.8L</h2>

    </div>

    <div className="card_bottom">

        <p>+12% this month</p>

    </div>

</div>
    </>
  )
}

export default Card