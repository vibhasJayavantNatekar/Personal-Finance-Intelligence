import React from 'react'
import '../Styles/Live_market_strip.css'

const Live_market_strip = ({ data }) => {



    return (
        <div className="live_market_strip">

            <div className="market_heading">
                <h5>Live Market</h5>
            </div>

        
            {
                data.slice(0, 3).map((stock) => {

                    const isGain = stock.percentChange >= 0

                    return (
                        <div
                            className={`market_item ${isGain ? "gain" : "loss"}`}
                            key={stock.assetSymbol}
                        >
                            <h5>{stock.assetSymbol}</h5>

                            <h6>₹{stock.currentPrice}</h6>

                            <p>
                                {isGain ? "↑" : "↓"} {Math.abs(stock.percentChange)}%
                            </p>
                        </div>
                    )
                })
            }




        </div>
    )


}

export default Live_market_strip