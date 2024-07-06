import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DoctorLogin = (prop) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    function signup() {
        navigate('/doctor/signup');
    }

    const isValidForm = () => {
        return username.trim() !== "" && pass.trim() !== "";
    };

    function HandleDoctorLogin(e) {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Please enter both email and password.");
            return;
        }

        const tosend = {
            username: username,
            pass: pass
        };

        axios.post("http://localhost:3000/doctor/login", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    const login = { name: response.data.name };
                    localStorage.setItem("doctor_login", JSON.stringify(login));
                    navigate("/doctor/homepage"); // Ensure this route exists
                } else {
                    alert("Invalid email or password");
                }
            })
            .catch((error) => {
                alert("An error occurred during login: " + error.message);
            });
    }
    
    return (
        <div className="outer">
            <div className="wrapper">
                <h1 className="main-header">Doctor Login</h1>
                <form className='form' onSubmit={HandleDoctorLogin}>
                    <div >
                        <label>Email:  </label>
                        <input className="form-inp" type='email' placeholder='johndoe@gmail.com'  onChange={(e) => setUsername(e.target.value)} />
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

export default DoctorLogin