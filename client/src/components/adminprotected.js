import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminProtected = (props) => {
    const navigate = useNavigate() 
    const [name, setName] = useState("")
    const {Component} = props

    useEffect(() => {
        let login = localStorage.getItem('admin_login')
        if(!login){
            navigate("/admin/login")
        } else {
            const login_object = JSON.parse(login)
            setName(login_object.name)
        }
    })

    return(
        <div>
            <Component adminname={name}/>
        </div>
    )
}

export default AdminProtected