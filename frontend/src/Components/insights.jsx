import React from 'react'
import '../Styles/Insights.css'

const insights = ({ data }) => {

    
    return (
        <>
            <div className="insights_container">
                <h3 className="insights_heading">Insights</h3>

                {data.map((insight, index) => (
                    <div
                        key={index}
                        className={`insight_card insight_${insight.type.toLowerCase()}`}
                    >
                        <p>{insight.message}</p>
                    </div>
                ))}

            </div>
        </>
    )
}

export default insights