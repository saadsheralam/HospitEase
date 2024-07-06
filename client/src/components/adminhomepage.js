import { useNavigate } from "react-router-dom"
import './landingpage.css'

const AdminHomepage = (prop) => {
    const navigate = useNavigate() 

    function AddDoctor(){
        navigate("/admin/addDoctor")
    }

    function AddNurse(){
        navigate("/admin/addNurse")
    }

    function NurseRoom(){
        navigate("/admin/assign-nurse-room")
    }

    const Signout = () => {
        localStorage.removeItem('admin_login')
        navigate("/admin/login")
    }
    

    return (
        <div>
            <div className="outer">
                <div className="main">
                    <h1 className="main-heading">Admin Homepage</h1>
                    <h3 > Use Cases:</h3>
                    <button onClick={AddDoctor} className="role-btn">Add Doctor to System</button>
                    <button onClick={AddNurse} className="role-btn">Add Nurse to System</button>
                    <button onClick={NurseRoom} className="role-btn">Assign Nurse and Patient to Room</button>
                    <button onClick={Signout} className="role-btn">Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default AdminHomepage