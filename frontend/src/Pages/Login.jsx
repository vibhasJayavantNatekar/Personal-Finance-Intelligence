import { useState } from "react"
import axios from 'axios'
import "../Pages/Login.css"
import { useNavigate , NavLink } from "react-router-dom"



function Login() {

    const naviagte = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, seterror] = useState({})
    const [servererror, setServererror] = useState("")
    const [loading, setloading] = useState(false)

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
            
            console.log("Failed to fetch info" , err.message);


        }


    }

    const handleLogin = async (e) => {

        e.preventDefault();

        await validate()


    }



    return (
        <>
            <div className="auth_wrapper">

                <div className="auth_container">

                    <h3 className="auth_heading">Login</h3>

                    <div className="form-container">
                        <form onSubmit={handleLogin} >



                            <div className="input-group">
                                <label>Email</label>
                                <input type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                {
                                    error.email && <p className="errmsg">{error.email}</p>
                                }
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />

                                {
                                    error.password && <p className="errmsg">{error.password}</p>
                                }

                            </div>



                            <div className="authBtn">

                                <input type="submit"
                                    value="Login"
                                    className="btnAuth"
                                />
                            </div>

                        </form>
                     {
                        servererror && <p className="errmsg" >{servererror}</p>
                     }
                        <NavLink to="/register">
                            <p className="switchAuth">New User?</p>
                        </NavLink>

                    </div>

                </div>

            </div>
        </>
    )

}

export default Login