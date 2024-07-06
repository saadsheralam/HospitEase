import { useEffect,useState } from 'react'
import axios from 'axios' 
import { Dropdown } from 'primereact/dropdown'
import { useNavigate } from 'react-router-dom'

const CreateMedicalRecord = (prop) => {
    const navigate = useNavigate();
    const options = ['admit', 'discharge'];
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patientname, setPatientName] = useState("");
    const [doctorname, setDoctorName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState("");
    const [patientstatus, setPatientStatus] = useState("");

    useEffect(() => {
        const fetchPatientData = async () => {
            let result = await axios.get("http://localhost:3000/admin/getPatientData");
            setPatients(Object.values(result.data));
        };
        fetchPatientData();
    }, []);

    useEffect(() => {
        const fetchDoctorData = async () => {
            let result = await axios.get("http://localhost:3000/admin/getDoctorData");
            setDoctors(Object.values(result.data));
        };
        fetchDoctorData();
    }, []);

    const patientNames = patients.map((elem) => elem.name);
    const doctorNames = doctors.map((elem) => elem.name);

    const isValidForm = () => {
        return doctorname.trim() !== "" &&
               patientname.trim() !== "" &&
               diagnosis.trim() !== "" &&
               prescription.trim() !== "" &&
               patientstatus.trim() !== "";
    };

    const HandleCreateMedicalRecord = (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Please fill out all fields correctly.");
            return;
        }

        const tosend = {
            doctor_name: doctorname,
            patient_name: patientname,
            diagnosis: diagnosis,
            prescription: prescription,
            patient_status: patientstatus
        };

        axios.post("http://localhost:3000/doctor/createMedicalRecord", tosend)
            .then((result) => {
                if (result.data.status === "success") {
                    alert("Medical record created!");
                    navigate("/doctor/homepage"); // Adjust if necessary
                } else {
                    alert(result.data.msg || "Could not create medical record.");
                }
            })
            .catch((error) => {
                alert("An error occurred: " + error.message);
            });
    };


    

    return (
        <div>
            <div className="outer">
                <div className="main">
                    <h1>Create Medical Record</h1>
                    <form onSubmit={HandleCreateMedicalRecord}>
                        <div>
                            <label>Select Doctor Name:</label>
                            <Dropdown className="dropdown" value={doctorname} options={doctorNames} onChange={(e) => setDoctorName(e.target.value)}></Dropdown>
                        </div>
                        <div>
                            <label>Select Patient Name:</label>
                            <Dropdown className="dropdown" value={patientname} options={patientNames} onChange={(e) => setPatientName(e.target.value)}></Dropdown>
                        </div>
                        <div>
                            <label>Enter Diagnosis:</label>
                            <input className="form-inp" type="text" onChange={(e) => setDiagnosis(e.target.value)}/>
                        </div>
                        <div>
                            <label>Enter Prescription:</label>
                            <input className="form-inp" type="text" onChange={(e) => setPrescription(e.target.value)}/>
                        </div>
                        <div>
                            <label>Select Patient Status:</label>
                            <Dropdown className="dropdown" value={patientstatus} options={options} onChange={(e) => setPatientStatus(e.target.value)}></Dropdown>
                        </div>
                        <button type="submit" className="sub-button">Submit</button>
                        <button className="sub-button" onClick={() => navigate("/doctor/homepage")}>Return to Homepage</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMedicalRecord