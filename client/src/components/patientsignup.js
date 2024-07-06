import {Dropdown} from "primereact/dropdown"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './patientsignup.css'

const PatientSignup = (prop) => {
    const options = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }];
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const isValidForm = () => {
        if (!name || !gender || !contact  || !username || !pass) {
            alert("All fields must be filled.");
            return false;
        }

        if (isNaN(contact) || contact.toString().length < 10) {
            alert("Please enter a valid contact number.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            alert("Please enter a valid email address.");
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(pass)) {
            alert("Password must be at least 8 characters long and include at least one letter and one number.");
            return false;
        }

        return true;
    };

    async function HandlePatientSignup(e) {
        e.preventDefault();
        if (!isValidForm()) {
            return;
        }

        const tosend = {
            name, 
            age: parseInt(age, 10), 
            gender, 
            contact: parseInt(contact, 10), 
            username, 
            pass
        };

        axios.post("http://localhost:3000/patient/signup", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    alert("Signup successful!");
                    navigate("/patient/homepage");
                } else {
                    alert(response.data.msg || "Signup failed!");
                }
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.msg || "An error occurred during signup.");
                } else if (error.request) {
                    alert("No response received from server.");
                } else {
                    alert("Error during request setup: " + error.message);
                }
            });
    }


    return (
        <div className="outer">
            {/* <pre>{JSON.stringify({name, gender, age, contact, username, pass})}</pre> */}
            <div className="wrapper">
                <h1 className="main-header">Patient Sign-Up</h1>
                <form className='form' onSubmit={HandlePatientSignup}>
                    <div >
                        <label>Full Name:</label>
                        <input className="form-inp" type='firstname' placeholder='John Doe' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Gender:</label>
                        <Dropdown className="dropdown" options={options} onChange={(e) => setGender(e.target.value)} value={gender}> </Dropdown>
                    </div>
                    <div>
                        <label>Age:</label>
                        <input className="form-inp" type="number" placeholder="24" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div>
                        <label>Contact:</label>
                        <input className="form-inp" type="number" placeholder="03044656463" onChange={(e) => setContact(e.target.value)}/>
                    </div>
                    <div >
                        <label>Email:</label>
                        <input className="form-inp" type='username' placeholder='john'  onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                <div>
                        <label>Password:</label>
                        <input className="form-inp" type='password' placeholder='*****'  onChange={(e) => setPass(e.target.value)}/>
                </div>             
                <div>
                        <button type="submit" className="sub-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PatientSignup