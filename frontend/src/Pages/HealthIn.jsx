import React from 'react'
import '../Styles/HealthIn.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
const HealthIn = () => {

    const insights = [

        {
            type:"SAFE",
            title:"Healthy EMI Ratio",
            description:"Your current EMI burden is within safe financial limits."
        },

        {
            type:"WARNING",
            title:"High Food Expenses",
            description:"Food and dining expenses increased compared to last month."
        },

        {
            type:"INFO",
            title:"Investment Diversification",
            description:"Your portfolio allocation is balanced across multiple assets."
        },

        {
            type:"DANGER",
            title:"Multiple Active Loans",
            description:"Having multiple active loans may increase financial pressure."
        }

    ]

  return (

    <div className="section_wrapper">

      <Sidebar />

      <div className="main_section">

        <Navbar />

        <div className="section_content">





          {/* HEADER */}

          <div className="healthPage_health_header">

            <h2>

              Financial Health Insights

            </h2>



            <p>

              Smart financial analysis and personalized recommendations

            </p>

          </div>








          {/* INSIGHTS GRID */}

          <div className="healthPage_insights_grid">



            {
              insights.map((item, index) => (

                <div
                  key={index}
                  className={`healthPage_insight_card ${item.type.toLowerCase()}_card`}
                >



                  <div className="healthPage_insight_top">



                    <div className={`healthPage_insight_indicator ${item.type.toLowerCase()}_indicator`}>

                    </div>



                    <h3>

                      {item.title}

                    </h3>

                  </div>





                  <p>

                    {item.description}

                  </p>





                  <span>

                    {item.type}

                  </span>

                </div>

              ))
            }

          </div>








          {/* SUMMARY */}

          <div className="healthPage_health_summary">



            <div className="healthPage_summary_box">

              <h4>

                Overall Financial Status

              </h4>



              <div className="healthPage_summary_status">

                Stable

              </div>

            </div>





            <div className="healthPage_summary_box">

              <h4>

                Recommendation

              </h4>



              <p>

                Continue maintaining balanced spending and investment habits.

              </p>

            </div>

          </div>





        </div>

      </div>

    </div>

  )
}

export default HealthIn