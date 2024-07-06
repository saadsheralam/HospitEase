import { useNavigate } from "react-router-dom"
import './landingpage.css'

const LandingPage = (prop) => {
    const navigate = useNavigate() 

    function DoctorLogin(){
        navigate("/doctor/login")
    }

    function PatientLogin(){
        navigate("/patient/login")
    }

    function AdminLogin(){
        navigate("/admin/login")
    }

    return (
        <div>
            <div className="nav-bar">Created By: Saad Sher Alam and Zaid Ahmed Quershi</div>
            <div className="outer">
                <div className="main">
                    <h1 className="main-heading">Hospital Management System</h1>
                    <h3 >Select your role:</h3>
                    <button onClick={DoctorLogin} className="role-btn">Doctor</button>
                    <button onClick={PatientLogin} className="role-btn">Patient</button>
                    <button onClick={AdminLogin} className="role-btn">Admin</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage