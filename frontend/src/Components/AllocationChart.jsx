import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'


const AllocationChart = ({ title,  data, total }) => {

    const COLORS = [
        "#10B981",
        "#3B82F6",
        "#F59E0B",
        "#EC4899",
        "#8B5CF6",
        "#EF4444",
        "#06B6D4"
    ]

   
    return (
        <>
            <div className="chart_container">

                <h3>

                 
                    {title}

                </h3>

                <div className="chart_content">

                    {/* CHART */}

                    <div className="chart_left">

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <PieChart>

                                <Pie
                                    data={data}
                                    dataKey="amount"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={130}
                                    innerRadius={70}
                                >

                                    {
                                        data.map((entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />

                                        ))
                                    }

                                </Pie>



                                <text
                                    x="50%"
                                    y="48%"
                                    textAnchor="middle"
                                    fill="#F9FAFB"
                                    fontSize="28"
                                    fontWeight="700"
                                >

                                ₹{total.toLocaleString()} 

                                

                                </text>



                                <text
                                    x="50%"
                                    y="58%"
                                    textAnchor="middle"
                                    fill="#9CA3AF"
                                    fontSize="16"
                                >

                                    Total

                                </text>

                            </PieChart>

                        </ResponsiveContainer>

                    </div>



                    {/* LEGEND */}

                    <div className="chart_breakdown">

                        {

                            data.map((item, index) => {

                                // const percentage = (

                                //     (item.amount / total) * 100

                                // ).toFixed(0)

                                return (

                                    <div
                                        className="breakdown_item"
                                        key={index}
                                    >

                                        <div className="breakdown_left">

                                            <span
                                                className="breakdown_dot"
                                                style={{
                                                    backgroundColor:
                                                        COLORS[index % COLORS.length]
                                                }}
                                            ></span>

                                            <p>

                                                {item.category}

                                            </p>

                                        </div>



                                        <h5>

                                            {item.percentage}%

                                        </h5>

                                    </div>

                                )

                            })

                        }

                    </div>

                </div>

            </div>
        </>
    )
}

export default AllocationChart