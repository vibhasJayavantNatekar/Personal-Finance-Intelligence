import React from 'react'
import '../Componets/Live_market_strip.css'

const Live_market_strip = () => {



    return (
        <div className="live_market_strip">

            <div className="market_heading">
                <h5>Live Market</h5>
            </div>

            <div className="market_item gain">
                <h5>TCS</h5>
                <h6>₹3820</h6>
                <p>↑ 2.1%</p>
            </div>

            <div className="market_item loss">
                <h5>INFY</h5>
                <h6>₹1540</h6>
                <p>↓ 1.2%</p>
            </div>

            <div className="market_item gain">
                <h5>RELIANCE</h5>
                <h6>₹2880</h6>
                <p>↑ 0.8%</p>
            </div>

           
        </div>
    )


}

export default Live_market_strip