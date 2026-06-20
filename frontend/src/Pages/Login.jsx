import React from 'react'
import '../Styles/Login.css'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'


const Login = () => {
    const naviagte = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, seterror] = useState({})
    const [servererror, setServererror] = useState("")
    const [loading, setloading] = useState(false)
    const [formData, setFormData] = useState({})

    

    const validate = async (e) => {

        let newErrors = {}

        console.log(email);
        console.log(password);
        console.log(email.trim().length);

        if (!email.trim().length) {
            newErrors.email = "Email is required"

        }

        if (!password.trim().length) {
            newErrors.password = "Password is required"

        }
        seterror(newErrors)
        if (Object.keys(newErrors).length > 0) {
            return
        }


        try {


            const result = await axios.post(
                `http://localhost:5000/auth/api/v1/login`,
                { email, password },
                {
                    withCredentials: true
                }
            )

            alert("Login ")
            console.log(result.data.token);

            naviagte('/dash')




        } catch (err) {

            setServererror("User not found")

            console.log("Failed to fetch info", err.message);


        }


    }

    const handleLogin = async (e) => {

        e.preventDefault();

        await validate()


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

                    <div className="feature_list">

                        <div className="feature_item">
                            ✓ Track Expenses
                        </div>

                        <div className="feature_item">
                            ✓ Manage Investments
                        </div>

                        <div className="feature_item">
                            ✓ Track Loans & EMI
                        </div>

                        <div className="feature_item">
                            ✓ Financial Health Insights
                        </div>

                        <div className="feature_item">
                            ✓ Net Worth Tracking
                        </div>

                    </div>

                </div>





                <div className="login_right">

                    <div className="login_card ">

                        <div className="login_card_header">

                            <h2>
                                Welcome Back
                            </h2>

                            <p>
                                Sign in to continue to FinPilot
                            </p>

                        </div>



                        <form>

                            <div className="login_field">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                />

                            </div>



                            <div className="login_field">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                />

                            </div>



                            <button
                                type="submit"
                                className="login_btn"
                            >

                                Login

                            </button>

                        </form>



                        <div className="login_footer">

                            <p>
                                Don't have an account?
                            </p>

                            <span
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )


}

export default Login