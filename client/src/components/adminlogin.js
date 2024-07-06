import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminLogin = (prop) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const adminCredentials = {
        username: "admin@gmail.com",
        password: "test123"
    };

    const isValidForm = () => {
        return username.trim() !== "" && pass.trim() !== "";
    };

    function HandleAdminLogin(e) {
        e.preventDefault();

        if (!isValidForm()) {
            alert("Please enter both email and password.");
            return;
        }

        if (username === adminCredentials.username && pass === adminCredentials.password) {
            localStorage.setItem("admin_login", JSON.stringify({ name: "Admin" }));
            navigate("/admin/homepage");
        } else {
            alert("Invalid username or password");
        }
    }
    
    return (
        <div className="outer">
            <div className="wrapper">
                <h1 className="main-header">Admin Login</h1>
                <form className='form' onSubmit={HandleAdminLogin}>
                    <div >
                        <label>Email:  </label>
                        <input className="form-inp" type='email' placeholder='username'  onChange={(e) => setUsername(e.target.value)} />
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
            </div>
        </div>
    )
}

export default AdminLogin