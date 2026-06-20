import React, { useState } from 'react'
import '../Styles/Register.css'
import { useNavigate } from 'react-router-dom'
const Register = () => {

 
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [step1Data, setStep1Data] = useState({
    name: "",
    email: "",
    password: "",
    comPassword: ""

  })

  const [step2Data, setStep2Data] = useState({
    income: "",
    employmentType: "",
    riskPer: "",
    savingGoal: ""

  })

  const validStep1 = (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!step1Data.name) {
      newErrors.name = "Full Name Required"
    }
    if (!step1Data.email) {
      newErrors.email = "Valid Email Required"
    }
    if (!step1Data.password) {
      newErrors.password = "Password Required"
    }
    if (!step1Data.comPassword) {
      newErrors.comPassword = "Confirm Password Required"
    }
    if (!step1Data.password, length < 6) {
      newErrors.password = "Password must be minimum 6 characters"
    }
    if (step1Data.password !== step1Data.comPassword) {
      newErrors.confpassword = "Password must be match"
    }
    console.log(newErrors);

    setErrors(newErrors)
    console.log(setErrors);


    if (setErrors.length === 0) {
      setStep(2)
    }


  }

  const navigate = useNavigate();

  return (
    <>



      <div className="login_page">

        <div className="login_left">

          <div className="brand_section">

            <h1>
              FinPilot
            </h1>

            <p>
              Personal Finance Intelligence Platform
            </p>

          </div>

        </div>



        <div className="login_right">

          <div className="login_card register_card">

            {
              step === 1 &&

              <>
                <div className="login_card_header">

                  <h2>
                    Create Account
                  </h2>

                  <p>
                    Step 1 of 2
                  </p>

                </div>

                <div className="login_field">

                  <label>
                    Full Name
                  </label>

                  <input
                    className={errors.name ? "input_error" : ""}
                    type="text"
                    placeholder="Enter your full name"
                    value={step1Data.name}
                    onChange={(e) => {
                      setStep1Data({
                        ...step1Data,
                        name: e.target.value
                      })
                    }}
                  />

                  <p className="error_text">
                    {errors.name || ""}
                  </p>


                </div>

                <div className="login_field">

                  <label>
                    Email Address
                  </label>

                  <input
                    className={errors.email ? "input_error" : ""}
                    type="email"
                    placeholder="Enter your email"
                    value={step1Data.email}
                    onChange={(e) => {
                      setStep1Data({
                        ...step1Data,
                        email: e.target.value
                      })
                    }}
                  />


                  <p className="error_text">
                    {errors.email || ""}
                  </p>


                </div>

                <div className="login_field">

                  <label>
                    Password
                  </label>

                  <input
                    className={errors.password ? "input_error" : ""}
                    type="password"
                    placeholder="Create password"
                    value={step1Data.password}
                    onChange={(e) => {
                      setStep1Data({
                        ...step1Data,
                        password: e.target.value
                      })
                    }}
                  />


                  <p className="error_text">
                    {errors.password || ""}
                  </p>


                </div>

                <div className="login_field">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    className={errors.comPassword ? "input_error" : ""}
                    type="password"
                    placeholder="Confirm password"
                    value={step1Data.comPassword}
                    onChange={(e) => {
                      setStep1Data({
                        ...step1Data,
                        comPassword: e.target.value
                      })
                    }}
                  />


                  <p className="error_text">
                    {errors.confpassword || ""}
                  </p>


                </div>



                <button
                  className="login_btn"
                  onClick={(e) => (validStep1(e))}
                >

                  Next

                </button>

              </>
            }

            {
              step === 2 &&

              <>
                <div className="login_card_header">

                  <h2>
                    Financial Profile
                  </h2>

                  <p>
                    Step 2 of 2
                  </p>

                </div>

                <div className="login_field">

                  <label>
                    Monthly Income
                  </label>

                  <input
                    className={errors.income ? "input_error" : ""}
                    type="number"
                    placeholder="Enter monthly income"
                    value={step2Data.income}
                    onChange={(e) => {
                      setStep2Data({
                        ...step2Data,
                        income: e.target.value
                      })
                    }}
                  />

                </div>

                <div className="login_field">

                  <label>
                    Employment Type
                  </label>

                  <select
                    className={errors.empType ? "input_error" : ""}
                    value={step2Data.employmentType}
                    onChange={(e) => {
                      setStep2Data({
                        ...step2Data,
                        employmentType: e.target.value
                      })
                    }}
                  >

                    <option value={"Salaried"}>
                      Salaried
                    </option>

                    <option value={"Self_Employed"}>
                      Self Employed
                    </option>

                    <option value={"Student"}>
                      Student
                    </option>

                    <option value={"Business"}>
                      Business
                    </option>

                  </select>

                </div>

                <div className="login_field">

                  <label>
                    Risk Preference
                  </label>

                  <select
                    className={errors.risk ? "input_error" : ""}
                    value={step2Data.riskPer}
                    onChange={(e) => {
                      setStep2Data({
                        ...step2Data,
                        riskPer: e.target.value
                      })
                    }}
                  >

                    <option value={"low"}>
                      Low
                    </option>

                    <option value={"medium"}>
                      Medium
                    </option>

                    <option value={"high"}>
                      High
                    </option>

                  </select>

                </div>

                <div className="login_field">

                  <label>
                    Saving Goal
                  </label>

                  <input
                    className={errors.savingGoal ? "input_error" : "input_error"}
                    type="text"
                    placeholder="Enter Saving Goal"
                    value={step2Data.savingGoal}
                    onChange={(e) => {
                      setStep2Data({
                        ...step2Data,
                        savingGoal: e.target.value
                      })
                    }}

                  />

                </div>

                <div className="register_actions">

                  <button
                    className="back_btn"
                    onClick={() => setStep(1)}
                  >

                    Back

                  </button>

                  <button
                    className="login_btn"
                  >

                    Create Account

                  </button>

                </div>

              </>
            }

            <div className="login_footer">

              <p>
                Already have an account?
              </p>

              <span
                onClick={() => navigate("/")}
              >
                Login
              </span>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Register