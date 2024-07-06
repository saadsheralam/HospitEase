import { useState, useEffect } from "react"
import axios from "axios"
import { Dropdown } from "primereact/dropdown"
import { useNavigate } from "react-router-dom"

const AppointmentNotes = (props) => {
    const navigate = useNavigate();
    const { doctorname } = props;
    const [patients, setPatients] = useState([]);
    const [patientname, setPatientName] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/admin/getPatientData");
                setPatients(Object.values(result.data));
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };
        fetchPatientData();
    }, []);

    const patientNames = patients.map((elem) => elem.name);

    const isValidForm = () => {
        return patientname.trim() !== "" && notes.trim() !== "";
    };

    const handleNotes = (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Please select a patient and enter notes.");
            return;
        }

        const toSend = {
            doctor_name: doctorname,
            patient_name: patientname,
            appointment_notes: notes
        };

        axios.post("http://localhost:3000/doctor/updateAppointmentNotes", toSend)
            .then((response) => {
                if (response.data.status === "success") {
                    alert("Notes added successfully.");
                } else {
                    alert("Failed to add notes: " + response.data.msg);
                }
            })
            .catch((error) => {
                alert("An error occurred: " + error.message);
            });
    };

    return(
        <div className="outer">
            <div className="main">
                <h1 className="main-heading">Add Appointment Notes</h1>  
                <form onSubmit={handleNotes}>
                    <div>
                        <label>Select Available Patient:</label>
                        <Dropdown className="dropdown" value={patientname} options={patientNames} onChange={(e) => setPatientName(e.target.value)}></Dropdown>
                    </div>    
                    <div>
                        <label>Appointment Notes: </label>
                        <br/>
                        <br/>
                        <textarea value={notes} placeholder="Enter appointment notes" onChange={(e) => setNotes(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="sub-button">Add Notes</button>
                    <button className="sub-button" onClick={() => navigate("/doctor/homepage")}>Return to Homepage</button>
                </form>  
            </div>   

        </div>
    )
}

export default AppointmentNotes