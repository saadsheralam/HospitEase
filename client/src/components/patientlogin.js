import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './patientlogin.css'

const PatientLogin = (prop) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    function signup() {
        navigate('/patient/signup');
    }

    function isValidForm() {
        return username.trim() !== "" && pass.trim() !== "";
    }

    function HandlePatientLogin(e) {
        e.preventDefault();

        if (!isValidForm()) {
            alert("Please enter both username and password.");
            return;
        }

        const tosend = {
            username: username,
            pass: pass
        };

        axios
            .post("http://localhost:3000/patient/login", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    const login = { name: response.data.name };
                    localStorage.setItem("patient_login", JSON.stringify(login));
                    navigate("/patient/homepage");
                } else {
                    alert("Invalid username or password");
                }
            })
            .catch((error) => {
                alert("An error occurred during login: " + error.message);
            });
    }

    return (
        <div className="outer">
            <div className="wrapper">
                <h1 className="main-header">Patient Login</h1>
                <form className='form' onSubmit={HandlePatientLogin}>
                    <div >
                        <label>Email:  </label>
                        <input className="form-inp" type='username' placeholder='username'  onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:  </label>
                        <input className="form-inp" type='password' placeholder='password'  onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" className="sub-button">Login</button>
                        <button className="sub-button" onClick={() => navigate("/")}>Return to Landing Page</button>
                    </div>
                </form>
                <p>Don't have an account? <button onClick={signup} className="signup-btn">Signup</button></p>
            </div>
        </div>
    )
}

export default PatientLogin