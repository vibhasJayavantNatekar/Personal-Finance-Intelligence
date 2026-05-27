import React, { useState } from 'react'
import Sidebar from '../Componets/Sidebar'
import Navbar from '../Componets/Navbar'
import '../Pages/SipCalculator.css'


const SipCalculator = () => {

  const [activeCalculator, setActiveCalculator] = useState("SIP")

  const [investmentAmt, setInvestmentAmt] = useState(25000)

  const [returnRate, setReturnRate] = useState(12)

  const [timePeriod, setTimePeriod] = useState(10)



  let totalValue = 0

  let investedAmount = 0

  let estimatedReturns = 0



  /* SIP */

  if (activeCalculator === "SIP") {

    const monthlyRate = returnRate / 12 / 100

    const months = timePeriod * 12

    totalValue =
      investmentAmt *
      (
        (
          Math.pow(1 + monthlyRate, months) - 1
        ) / monthlyRate
      ) *
      (1 + monthlyRate)

    investedAmount = investmentAmt * months

  }



  /* LUMPSUM */

  else if (activeCalculator === "LUMPSUM") {

    totalValue =
      investmentAmt *
      Math.pow(
        1 + returnRate / 100,
        timePeriod
      )

    investedAmount = investmentAmt

  }



  /* FD */

  else if (activeCalculator === "FD") {

    totalValue =
      investmentAmt *
      Math.pow(
        1 + returnRate / 100,
        timePeriod
      )

    investedAmount = investmentAmt

  }



  /* PPF */

  else if (activeCalculator === "PPF") {

    totalValue =
      investmentAmt *
      (
        (
          Math.pow(
            1 + returnRate / 100,
            timePeriod
          ) - 1
        ) /
        (returnRate / 100)
      )

    investedAmount = investmentAmt * timePeriod

  }



  /* SWP */

  else if (activeCalculator === "SWP") {

    totalValue =
      investmentAmt *
      Math.pow(
        1 + returnRate / 100,
        timePeriod
      )

    investedAmount = investmentAmt

  }



  estimatedReturns = totalValue - investedAmount



  return (

    <>

      <div className="section_wrapper">

        <Sidebar />



        <div className="main_section">

          <Navbar />



          <div className="section_content">



            <div className="calculators_page">



              {/* HEADER */}

              <div className="calculators_header">

                <h2>

                  {activeCalculator} Calculator

                </h2>

                <p>

                  Estimate your future financial growth

                </p>

              </div>





              {/* MAIN WORKSPACE */}

              <div className="sip_workspace">



                {/* LEFT SIDE */}

                <div className="sip_calculator_section">



                  {/* SIP / LUMPSUM */}

                  {
                    (
                      activeCalculator === "SIP" ||
                      activeCalculator === "LUMPSUM"
                    ) &&

                    <div className="sip_toggle_wrapper">

                      <div
                        className={`sip_toggle ${activeCalculator === "SIP" ? "active_toggle" : ""}`}
                        onClick={() => setActiveCalculator("SIP")}
                      >

                        SIP

                      </div>



                      <div
                        className={`sip_toggle ${activeCalculator === "LUMPSUM" ? "active_toggle" : ""}`}
                        onClick={() => setActiveCalculator("LUMPSUM")}
                      >

                        Lumpsum

                      </div>

                    </div>
                  }






                  {/* INPUTS */}

                  <div className="calculator_inputs">



                    <div className="input_group">

                      <label>

                        {
                          activeCalculator === "SIP"
                            ?
                            "Monthly Investment"
                            :
                            "Investment Amount"
                        }

                      </label>



                      <input
                        type="number"
                        value={investmentAmt}
                        onChange={(e) =>
                          setInvestmentAmt(
                            Number(e.target.value)
                          )
                        }
                      />

                    </div>






                    <div className="input_group">

                      <label>

                        Expected Return Rate (%)

                      </label>



                      <input
                        type="number"
                        value={returnRate}
                        onChange={(e) =>
                          setReturnRate(
                            Number(e.target.value)
                          )
                        }
                      />

                    </div>






                    <div className="input_group">

                      <label>

                        Time Period (Years)

                      </label>



                      <input
                        type="number"
                        value={timePeriod}
                        onChange={(e) =>
                          setTimePeriod(
                            Number(e.target.value)
                          )
                        }
                      />

                    </div>






                    <button className="calculate_btn">

                      Calculate Returns

                    </button>

                  </div>

                </div>








                {/* CENTER RESULTS */}

                <div className="calculator_results">



                  {/* RESULT CARDS */}

                  <div className="result_cards">



                    <div className="result_card">

                      <p>

                        Invested Amount

                      </p>



                      <h3>

                        ₹{Math.round(investedAmount).toLocaleString()}

                      </h3>

                    </div>







                    <div className="result_card">

                      <p>

                        Estimated Returns

                      </p>



                      <h3 className="positive_text">

                        ₹{
                          Math.max(
                            Math.round(totalValue - investedAmount),
                            0
                          ).toLocaleString()
                        }

                      </h3>

                    </div>








                    <div className="result_card">

                      <p>

                        Total Value

                      </p>



                      <h3 className="positive_text">

                        ₹{Math.round(totalValue).toLocaleString()}

                      </h3>

                    </div>

                  </div>








                  {/* CHART */}

                  <div className="calculator_chart">

                    Chart Area

                  </div>

                  {/* BREAKDOWN */}

                  <div className="investment_breakdown">

                    <div className="breakdown_item">

                      <p>
                        Invested Amount
                      </p>

                      <h4>

                        ₹{Math.round(investedAmount).toLocaleString()}

                      </h4>

                    </div>



                    <div className="breakdown_item">

                      <p>
                        Estimated Returns
                      </p>

                      <h4 className="positive_text">

                        ₹{Math.round(estimatedReturns).toLocaleString()}


                      </h4>

                    </div>

                  </div>

                </div>








                {/* RIGHT SIDE CALCULATORS */}

                <div className="popular_calculators">



                  <div
                    className="calculator_card"
                    onClick={() => setActiveCalculator("FD")}
                  >

                    <h3>

                      FD Calculator

                    </h3>



                    <p>

                      Calculate FD maturity returns.

                    </p>

                  </div>


                  <div
                    className="calculator_card"
                    onClick={() => setActiveCalculator("SIP")}
                  >

                    <h3>

                      SIP Calculator

                    </h3>

                    <p>

                      Estimate SIP and lumpsum investment growth.

                    </p>

                  </div>





                  <div
                    className="calculator_card"
                    onClick={() => setActiveCalculator("PPF")}
                  >

                    <h3>

                      PPF Calculator

                    </h3>



                    <p>

                      Estimate long-term PPF growth.

                    </p>

                  </div>








                  <div
                    className="calculator_card"
                    onClick={() => setActiveCalculator("SWP")}
                  >

                    <h3>

                      SWP Calculator

                    </h3>



                    <p>

                      Plan systematic withdrawal strategy.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  )

}

export default SipCalculator