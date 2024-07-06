import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const HospitalBill = (props) => {
    const navigate = useNavigate()
    const [bill, setBill] = useState("")
    const [billFlag, setBillFlag] = useState(false)
    const {patientname} = props


    useEffect(() => {
        const fetchBill = async function () {
            const tosend = {
                patient_name: patientname
            }

            axios
                .post("http://localhost:3000/patient/getBill", tosend)
                .then((response) => {
                    if(response.data.status === "success"){
                        setBillFlag(true)
                        setBill(response.data.bill_amount)
                    }else{
                        alert("Bill does not exist")
                    }
                })
        }
        fetchBill() 
    }, [])


    return(
        <div className="outer">
            <div className="main">
                {billFlag ? <h1 className="main-heading">The pending bill for patient: {patientname} is: {bill}</h1> : <h1 className="main-heading">You have no pending bills</h1>}
                <button className="sub-button" onClick={() => navigate("/patient/homepage")}>Return to Homepage</button>
            </div>

        </div>
    )
}

export default HospitalBill