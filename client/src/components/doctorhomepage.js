import { useNavigate } from "react-router-dom"
import './landingpage.css'
import { useState } from "react"
import axios from "axios"

const DoctorHomepage = (prop) => {
    const [search, setSearch] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [contact, setContact] = useState("")
    const [searchFlag, setSearchFlag] = useState(false)
    const [err, setErr] = useState('No search results')
    const navigate = useNavigate() 

    function CreateMedicalRecord(){
        navigate("/doctor/create-medical-record")
    }

    function AddAppointmentNotes(){
        navigate("/doctor/add-appointment-notes")
    }

    function DischargePatient(){
        navigate("/doctor/discharge-patient")
    }

    const Signout = () => {
        localStorage.removeItem('doctor_login')
        navigate("/doctor/login")
    }
    
    const handleSearch = () => {
        setSearchFlag(false)
        const tosend = {
            name: search 
        }

        axios  
            .post("http://localhost:3000/doctor/searchPatient", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    setName(response.data.name)
                    setAge(response.data.age)
                    setGender(response.data.gender)
                    setContact(response.data.contact)
                    setSearchFlag(true)
                } else {
                    setErr(response.data.msg || "Invalid search")
                    // alert(response.data.msg || "Invalid search");
                }
            })
    }

    return (
        <div>
            <div className="outer">
                <div className="main">
                    <h1 className="main-heading">Doctor Homepage</h1>
                    <div>
                        <label>Search for Patients: </label>
                        <input type="text" placeholder="Enter patient name" style={{width: "58%"}}  value={search} onChange={(e) => setSearch(e.target.value)}></input>
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="search-results">
                        <div className="search-heading">Search Results:</div>
                        {searchFlag ? 
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Contact</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{name}</td>
                                    <td>{age}</td>
                                    <td>{gender}</td>
                                    <td>{contact}</td>
                                </tr>
                                </tbody>
                            </table>
                        : err}
                    </div>
                    <h3 > Use Cases:</h3>
                    <button onClick={CreateMedicalRecord} className="role-btn">Create Medical Record</button>
                    <button onClick={AddAppointmentNotes} className="role-btn">Add/Update Appointment Notes</button>
                    <button onClick={DischargePatient} className="role-btn">Discharge a Patient</button>
                    <button onClick={Signout} className="role-btn">Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default DoctorHomepage