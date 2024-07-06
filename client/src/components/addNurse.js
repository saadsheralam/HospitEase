import {Dropdown} from "primereact/dropdown"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddNurse = (prop) => {
    const navigate = useNavigate();
    const options = ['Male', 'Female', 'Other'];
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [contact, setContact] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const isValidForm = () => {
        return name.trim() !== "" &&
               gender.trim() !== "" &&
               contact.trim() !== "" && !isNaN(contact) &&
               username.trim() !== "" &&
               pass.trim() !== "";
    };

    async function HandleAddNurse(e) {
        e.preventDefault();
        if (!isValidForm()) {
            alert("Please fill out all fields correctly.");
            return;
        }

        const tosend = {
            name, 
            gender, 
            contact: parseInt(contact, 10), 
            username, 
            pass
        };

        axios.post("http://localhost:3000/admin/addNurse", tosend)
            .then((response) => {
                if (response.data.status === "success") {
                    alert("New nurse added!");
                    navigate("/admin/homepage");
                } else {
                    alert(response.data.msg || "Failed to add nurse.");
                }
            })
            .catch((error) => {
                alert("An error occurred: " + error.message);
            });
    }


    return (
        <div className="outer">
            {/* <pre>{JSON.stringify({name, gender, age, contact, username, pass})}</pre> */}
            <div className="wrapper">
                <h1 className="main-header">Add New Nurse</h1>
                <form className='form' onSubmit={HandleAddNurse}>
                    <div >
                        <label>Full Name:</label>
                        <input className="form-inp" type='name' placeholder='John Doe' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Gender:</label>
                        <Dropdown className="dropdown" options={options} onChange={(e) => setGender(e.target.value)} value={gender}> </Dropdown>
                    </div>
                    <div>
                        <label>Contact:</label>
                        <input className="form-inp" type="number" placeholder="03044656463" onChange={(e) => setContact(e.target.value)}/>
                    </div>
                    <div >
                        <label>Username:</label>
                        <input className="form-inp" type='username' placeholder='john'  onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                <div>
                        <label>Password:</label>
                        <input className="form-inp" type='password' placeholder='*****'  onChange={(e) => setPass(e.target.value)}/>
                </div>             
                <div>
                        <button type="submit" className="sub-button">Submit</button>
                        <button className="sub-button" onClick={() => navigate("/admin/homepage")}>Return to Homepage</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNurse