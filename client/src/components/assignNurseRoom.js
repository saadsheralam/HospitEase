import { useEffect,useState } from "react"
import axios from "axios"
import { Dropdown } from "primereact/dropdown"
import { useNavigate } from "react-router-dom"

const AssignNurseRoom = (prop) => {
    const navigate = useNavigate();
    const [nurses, setNurses] = useState([]);
    const [patients, setPatients] = useState([]);
    const [nursename, setNurseName] = useState("");
    const [patientname, setPatientName] = useState("");
    const [room, setRoom] = useState("");

    useEffect(() => {
        const fetchNurseData = async () => {
            try {
                const result = await axios.get("http://localhost:3000/admin/getNurseData");
                setNurses(Object.values(result.data));
            } catch (error) {
                console.error("Error fetching nurse data:", error);
            }
        };
        fetchNurseData();
    }, []);

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

    const nurseNames = nurses.map((elem) => elem.name);
    const patientNames = patients.map((elem) => elem.name);

    const isValidForm = () => {
        return nursename.trim() !== "" &&
               patientname.trim() !== "" &&
               room.trim() !== "" && !isNaN(room);
    };

    const handleAssignment = (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Please fill out all fields correctly.");
            return;
        }

        const tosend = {
            nurse: nursename,
            patient: patientname, 
            room_number: parseInt(room, 10)   
        };

        axios.post("http://localhost:3000/admin/assignRoom", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    alert("Room assigned successfully.");
                } else {
                    alert(response.data.msg || "Error in assigning room.");
                }
            })
            .catch((error) => {
                alert("An error occurred: " + error.message);
            });
    };


    return(
        <div className="outer">
            <div className="wrapper">
                <h1>Assign Nurse to Room</h1>
                <form onSubmit={handleAssignment}>
                    <div>
                        <label>Select Available Nurse:</label>
                        <Dropdown className="dropdown" value={nursename} options={nurseNames} onChange={(e) => setNurseName(e.target.value)}></Dropdown>
                    </div>
                    <div>
                        <label>Select Available Patient:</label>
                        <Dropdown className="dropdown" value={patientname} options={patientNames} onChange={(e) => setPatientName(e.target.value)}></Dropdown>
                    </div>
                    <div>
                        <label>Enter Room No:</label>
                        <input className="form-inp" type="number" onChange={(e) => setRoom(e.target.value)}/>
                    </div>
                    <button type="submit" className="sub-button">Submit</button>
                    <button className="sub-button" onClick={() => navigate("/admin/homepage")}>Return to Homepage</button>
                </form>
            </div>
        </div>
    )
}

export default AssignNurseRoom