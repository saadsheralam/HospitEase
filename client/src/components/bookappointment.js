import { useState, useEffect } from "react"
import { Dropdown } from "primereact/dropdown"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BookAppointment = (props) => {
    const navigate = useNavigate();
    const { patientname } = props;
    const [doctors, setDoctors] = useState([]);
    const [doctorname, setDoctorName] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                let result = await axios.get("http://localhost:3000/admin/getDoctorData");
                setDoctors(Object.values(result.data));
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            }
        };
        fetchDoctors();
    }, []);

    const doctorNames = doctors.map((elem) => elem.name);

    const isValidForm = () => {
        return doctorname.trim() !== "";
    };

    const handleAppointment = (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Please select a doctor.");
            return;
        }

        const tosend = {
            doctor_name: doctorname, 
            patient_name: patientname
        };

        axios.post("http://localhost:3000/patient/bookAppointment", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    alert("Appointment booked successfully.");
                } else {
                    alert(response.data.msg || "Could not book appointment.");
                }
            })
            .catch((error) => {
                alert("An error occurred: " + error.message);
            });
    };

    return(
        <div className="outer">
            <div className="main">
                <h1 className="main-heading">Schedule an Appointment</h1>
                <form onSubmit={handleAppointment}>
                    <div>
                        <label>Select Available Doctor:</label>
                        <Dropdown className="dropdown" value={doctorname} options={doctorNames} onChange={(e) => setDoctorName(e.target.value)}></Dropdown>
                    </div>
                    <button type="submit" className="sub-button">Book an Appointment</button>
                    <button className="sub-button" onClick={() => navigate("/patient/homepage")}>Return to Homepage</button>
                </form>
            </div>
        </div>
    ) 
}

export default BookAppointment