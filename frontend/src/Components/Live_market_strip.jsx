import React, { useEffect, useState } from 'react'
import '../Styles/Live_market_strip.css'
import { getStocksHoldings } from '../Api/investmentApi'

const Live_market_strip = () => {

    const [stockHoldingData, setstockHoldingData] = useState([])

    const fetchHolding = async () => {

        const token = localStorage.getItem("token")

        const response = await getStocksHoldings(token)

        setstockHoldingData(response.data.data)


        console.log(response.data.data)


    }

    useEffect(() => {
        fetchHolding()

    }, [])



    return (
        <div className="live_market_strip">

            <div className="market_heading">
                <h5>Live Market</h5>
            </div>


            {
                stockHoldingData.slice(0, 3).map((stock, index) => {

                    const isGain = stockHoldingData.percentChange >= 0

                    return (
                        <div
                            className={`market_item ${isGain ? "gain" : "loss"}`}
                            key={index}
                        >
                            <h5>{stockHoldingData[index].assetSymbol}</h5>

                            <h6>₹{stockHoldingData[index].currentPrice}</h6>

                            <p>
                                {isGain ? "↑" : "↓"} {Math.abs(stockHoldingData[index].percentChange)}%
                            </p>
                        </div>
                    )
                })
            }




        </div>
    )


}

export default Live_market_strip