import { useState, useEffect } from "react"
import { Dropdown } from "primereact/dropdown"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LeaveRating = (props) => {
    const navigate = useNavigate() 
    const {patientname} = props
    const [doctors, setDoctors] = useState([])
    const [doctorname, setDoctorName] = useState("")
    const [rating, setRating] = useState("")

    useEffect(() => {
        const fetchDoctors = async function () {
            let result = await axios.get("http://localhost:3000/admin/getDoctorData")
            setDoctors(Object.values(result.data))
        }
        fetchDoctors() 
    }, [])

    const doctorNames = [] 
    doctors.map((elem) => {
        doctorNames.push(elem.name)
    })

    const handleRating = (e) => {
        e.preventDefault() 
        const tosend = {
            doctor_name: doctorname, 
            patient_name: patientname, 
            rating: parseInt(rating,10)
        }

        axios
            .post("http://localhost:3000/patient/leaveRating", tosend)
            .then((response) => {
                if(response.data.status === "success"){
                    alert("Thank you for submitting your rating")
                }else{
                    alert("Could not submit rating")
                }
            })
    }

    return(
        <div className="outer">
            <div className="main">
                <h1 className="main-heading">Leave Rating</h1>
                <form onSubmit={handleRating}>
                    <div>
                        <label>Select Available Doctor:</label>
                        <Dropdown className="dropdown" value={doctorname} options={doctorNames} onChange={(e) => setDoctorName(e.target.value)}></Dropdown>
                    </div>
                    <div>
                        <label>Select Rating Value:</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button type="submit" className="sub-button">Submit</button>
                    <button className="sub-button" onClick={() => navigate("/patient/homepage")}>Return to Homepage</button>
                </form>
            </div>
        </div>
    )
}

export default LeaveRating 