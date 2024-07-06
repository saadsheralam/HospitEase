import { useEffect, useState } from "react"
import axios from "axios"
import { Dropdown } from "primereact/dropdown"
import { useNavigate } from "react-router-dom"

const DischargePatient = (props) => {
    const navigate = useNavigate();
    const [medicalrecords, setMedicalRecords] = useState([]);
    const [patientname, setPatientName] = useState("");

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                let result = await axios.get("http://localhost:3000/admin/getMedicalRecords");
                setMedicalRecords(Object.values(result.data));
            } catch (error) {
                console.error("Error fetching medical records:", error);
            }
        };
        fetchMedicalRecords();
    }, []);

    const patientNames = medicalrecords.map((elem) => elem.patient_name);

    const isValidForm = () => {
        return patientname.trim() !== "";
    };

    const handleDischargePatient = (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Please select a patient to discharge.");
            return;
        }

        const tosend = {
            patientname: patientname
        };

        axios.post("http://localhost:3000/doctor/dischargePatient", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    alert("Patient status updated successfully.");
                } else {
                    alert(response.data.msg || "Error in updating patient status.");
                }
            })
            .catch((error) => {
                alert("An error occurred: " + error.message);
            });
    };

    return(
        <div className="outer">
            <div>
                <h1>Discharge a Patient</h1>
                <form onSubmit={handleDischargePatient}>
                    <div>
                        <label>Select Available Patient to Discharge:</label>
                        <Dropdown className="dropdown" value={patientname} options={patientNames} onChange={(e) => setPatientName(e.target.value)}></Dropdown>
                    </div>
                    <button type="submit" className="sub-button">Submit</button>
                    <button className="sub-button" onClick={() => navigate("/doctor/homepage")}>Return to Homepage</button>
                </form>
            </div>
        </div>
    )
} 

export default DischargePatient