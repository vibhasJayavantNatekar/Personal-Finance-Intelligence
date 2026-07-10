import React from 'react'
import '../Styles/Login.css'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { loginUser } from "../Api/authApi"
// import {loginUser} from '../Api/authApi'


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, seterror] = useState({})
    const [servererror, setServererror] = useState("")
    const [loading, setloading] = useState(false)
    const [formData, setFormData] = useState({})

    

    const handleLogin = async (e) => {

        e.preventDefault();

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        seterror(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {

            setloading(true);

            const response = await loginUser({

                email,
                password

            })

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.data.token

            )

            navigate("/dash");

        } catch (error) {

            setServererror(

                error.response?.data?.message ||

                "Invalid Email or Password"

            )

        } finally {

            setloading(false);

        }

    }



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



                        <form onSubmit={handleLogin}>

                            <div className="login_field">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>



                            <div className="login_field">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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