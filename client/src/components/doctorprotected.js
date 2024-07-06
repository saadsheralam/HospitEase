import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const DoctorProtected = (props) => {
    const navigate = useNavigate() 
    const [name, setName] = useState("")
    const {Component} = props

    useEffect(() => {
        let login = localStorage.getItem('doctor_login')
        if(!login){
            navigate("/doctor/login")
        } else {
            const login_object = JSON.parse(login)
            setName(login_object.name)
        }
    })

    return(
        <div>
            <Component doctorname={name}/>
        </div>
    )
}

export default DoctorProtected