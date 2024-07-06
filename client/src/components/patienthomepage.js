import { useNavigate } from "react-router-dom"
import './landingpage.css'

const PatientHomepage = (prop) => {
    const navigate = useNavigate() 

    function BookAppointment(){
        navigate("/patient/book-appointment")
    }

    function LeaveRating(){
        navigate("/patient/leave-rating")
    }

    function ViewBill(){
        navigate("/patient/view-bill")
    }

    const Signout = () => {
        localStorage.removeItem("patient_login")
        navigate("/patient/homepage")
    }
    

    return (
        <div>
            <div className="outer">
                <div className="main">
                    <h1 className="main-heading">Patient Homepage</h1>
                    <h3 > Use Cases:</h3>
                    <button onClick={BookAppointment} className="role-btn">Book an Appointment</button>
                    <button onClick={LeaveRating} className="role-btn">Leave Rating for a Doctor</button>
                    <button onClick={ViewBill} className="role-btn">View Hospital Bill</button>
                    <button onClick={Signout} className="role-btn">Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default PatientHomepage