import { useState } from "react"
import { NavLink } from "react-router-dom"


function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [setConfirmPassword, setSetConfirmPassword] = useState("")


    return (
        <>

             <div className="auth_wrapper">

                <div className="auth_container">

                    <h3 className="auth_heading">Register</h3>

                    <div className="form-container">
                        <form>

                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label>Confirm Password</label>
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <div className="authBtn">
                                <input type="submit" value="Register" className="btnAuth" />
                            </div>

                        </form>

                        <NavLink to="/">
                            <p className="switchAuth">Already have an account?</p>
                        </NavLink>

                    </div>

                </div>

            </div>


        </>
    )

}

export default Register