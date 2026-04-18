import { useState } from "react"
import axios from 'axios'
import "../Pages/Login.css"


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <div className="login_wrapper">

                <div className="login_container">

                    <h3 className="login_heading">LogIn </h3>

                    <div className="form-conatiner">
                        <form >

                            <div className="emailInput">
                                <label>Email </label>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />


                            </div>

                            <div className="passInput">
                                <label>Password</label>
                                <input type="password"
                                    name="password"
                                    id="pass"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required

                                />
                            </div>

                            <div className="loginBtn">

                             <input type="submit"
                              value="LogIn" 
                              className="btnLogin"
                              />

                            </div>

                        </form>

                        <p className="gotoRegi" >Already have an Account ?</p>
                    </div>


                </div>

            </div>

        </>
    )

}

export default Login