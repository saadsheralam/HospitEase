import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const PatientProtected = (props) => {
    const navigate = useNavigate() 
    const [name, setName] = useState("")
    const {Component} = props

    useEffect(() => {
        let login = localStorage.getItem('patient_login')
        if(!login){
            navigate("/patient/login")
        } else {
            const login_object = JSON.parse(login)
            setName(login_object.name)
        }
    })

    return(
        <div>
            <Component patientname={name}/>
        </div>
    )
}

export default PatientProtected