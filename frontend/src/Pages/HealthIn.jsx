import React, { useEffect, useState } from 'react'
import '../Styles/HealthIn.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { getHealthInsights } from '../Api/healthInsightsApi'

const HealthIn = () => {

  const [insightsData, setInsightsData] = useState([])
  const [healthStatus, setHealthStatus] = useState("")
  const [recommendations, setRecommendations] = useState([])

  const insights = [

    {
      type: "SAFE",
      title: "Healthy EMI Ratio",
      description: "Your current EMI burden is within safe financial limits."
    },

    {
      type: "WARNING",
      title: "High Food Expenses",
      description: "Food and dining expenses increased compared to last month."
    },

    {
      type: "INFO",
      title: "Investment Diversification",
      description: "Your portfolio allocation is balanced across multiple assets."
    },

    {
      type: "DANGER",
      title: "Multiple Active Loans",
      description: "Having multiple active loans may increase financial pressure."
    }

  ]

  const fetchInsights = async () => {

    const token = localStorage.getItem("token")

    const insights = await getHealthInsights(token)
    console.log(insights.data.data)
    setInsightsData(insights.data.data.insights)
    setRecommendations(insights.data.data.recommendations)

    setHealthStatus(insights.data.data.status)

  }

  useEffect(() => {

    fetchInsights()

  }, [])


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
              insightsData.map((item, index) => (

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

                    {item.message}

                  </p>

                  <span>

                    {item.type}

                  </span>

                </div>

              ))

            }

            {/* {
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
            } */}

          </div>








          {/* SUMMARY */}

          <div className="healthPage_health_summary">

            <div className="healthPage_summary_box">

              <h4>

                Overall Financial Status

              </h4>



              <div className={`healthPage_summary_status healthPage_status_${healthStatus}`}>

                {healthStatus}

              </div>

            </div>





            <div className="healthPage_summary_box">

              <h4>

                Recommendation

              </h4>



          

                {recommendations.map((recommendation, index) => (
                  <p key={index}>• {recommendation}</p>
                ))}

           

            </div>

          </div>





        </div>

      </div>

    </div>

  )
}

export default HealthIn