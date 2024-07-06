import express, { response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import bcrypt from 'bcrypt';


dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
    console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})

// Define database schema and models

const patientSchema = new mongoose.Schema ({
    name: String, 
    age: Number, 
    gender: String,
    contact: Number, 
    username: String, 
    pass: String, 
})

const doctorSchema = new mongoose.Schema({
    name: String, 
    gender: String, 
    contact: Number, 
    experience: Number, 
    specialization: String, 
    username: String, 
    pass: String 
})

const nurseSchema = new mongoose.Schema({
    name: String, 
    gender: String, 
    contact: Number,  
    username: String, 
    pass: String 
})

const roomDetailsSchema = new mongoose.Schema({
    nurse: String, 
    patient: String, 
    room_number: Number,  
})

const medicalRecordSchema = new mongoose.Schema({
    doctor_name: String, 
    patient_name: String, 
    diagnosis: String, 
    prescription: String, 
    patient_status: String 
})

const appointmentSchema = new mongoose.Schema({
    doctor_name: String, 
    patient_name: String, 
    appointment_notes: String, 
})

const ratingSchema = new mongoose.Schema({
    doctor_name: String, 
    patient_name: String, 
    rating: Number, 
})

const hospitalBillSchema = new mongoose.Schema({
    patient_name: String,  
    bill_amount: String
})

const PatientModel = mongoose.model("patients", patientSchema)
const DoctorModel = mongoose.model("doctors", doctorSchema)
const NurseModel = mongoose.model("nurses", nurseSchema)
const RoomDetailsModel = mongoose.model("roomdetails", roomDetailsSchema)
const MedicalRecordModel = mongoose.model("medicalrecords", medicalRecordSchema)
const AppointmentModel = mongoose.model("appointments", appointmentSchema)
const RatingModel = mongoose.model("ratings", ratingSchema)
const HospitalBillModel = mongoose.model("hospitalbill", hospitalBillSchema)

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw error;
    }
};

//Make your API calls for every usecase here
app.post("/patient/signup", async (req,res) => {

    const patient_data = {
        name: req.body.name, 
        age: req.body.age, 
        gender: req.body.gender, 
        contact: req.body.contact, 
        username: req.body.username, 
        pass: await hashPassword(req.body.pass)
    }

    PatientModel
        .create(patient_data)
        .then(() => {
            console.log("saved to db")
            res.send({status:"success", msg:"New patient added"})
        })
        .catch((err) => {
            console.log("failed to save", err)
            res.send({status:"failed", msg:"username already exissts"})
        })
    
})

app.post("/patient/login", async (req,res) => {
    const {username, pass} = req.body 
    PatientModel
        .findOne({username:username})
        .then(async user => {
            if(user){
                const isMatch = await bcrypt.compare(pass, user.pass)
                if(isMatch){
                    res.send({status:"success", msg:"valid login credentials", name:user.name})
                } else {
                    res.send({status:"error", msg:"invalid login credentials"})
                }
            }
        })
})

app.post("/doctor/signup", async (req,res) => {

    const doctor_data = {
        name: req.body.name, 
        gender: req.body.gender, 
        contact: req.body.contact, 
        experience: req.body.experience, 
        specialization: req.body.specialization, 
        username: req.body.username, 
        pass: await hashPassword(req.body.pass)
    }

    DoctorModel
        .create(doctor_data)
        .then(() => {
            console.log("saved to db")
            res.send({status:"success", msg:"New patient added"})
        })
        .catch((err) => {
            console.log("failed to save", err)
            res.send({status:"failed", msg:"username already exissts"})
        })
    
})

app.post("/doctor/login", (req,res) => {
    console.log("req received")
    const {username, pass} = req.body 
    DoctorModel.findOne({username:username})
        .then(async user => {
            if(user){
                const isMatch = await bcrypt.compare(pass, user.pass)
                if(isMatch){
                    res.send({status:"success", msg:"valid login credentials", name:user.name})
                } else {
                    res.send({status:"error", msg:"invalid login credentials"})
                }
            } else {
                res.send({status:"error", msg:"invalid login credentials"})
            }
        })
})

app.post("/admin/login", (req,res) => {
    const {username, pass} = req.body 
    if (username === 'admin@gmail.com'){
        if (pass === 'test123'){
            res.send({status:"success", msg:"valid admin credentials", name:"Admin"})
        } else {
            res.send({status:"error", msg:"invalid login credentials"})
        } 
    } else {
        res.send({status:"error", msg:"invalid login credentials"})
    }
})

app.post("/admin/addDoctor", (req,res) => {
    console.log(req.body)
    DoctorModel
        .create(req.body)
        .then(() => {
            console.log("saved to db")
            res.send({status:"success", msg:"New patient added"})
        })
        .catch((err) => {
            console.log("failed to save", err)
            res.send({status:"failed", msg:"username already exissts"})
        })
    
})

app.post("/admin/addNurse", async (req,res) => {

    const nurse_data = {
        name: req.body.name, 
        gender: req.body.gender, 
        contact: req.body.contact, 
        username:req.body.username, 
        pass: await hashPassword(req.body.pass)
    }

    NurseModel
        .create(nurse_data)
        .then(() => {
            console.log("saved to db")
            res.send({status:"success", msg:"New patient added"})
        })
        .catch((err) => {
            console.log("failed to save", err)
            res.send({status:"failed", msg:"username already exissts"})
        })
    
})

app.get("/admin/getNurseData", (req,res) => {
    console.log("Get request received")
    NurseModel.find({})
        .select("name gender contact")
        .exec() 
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            res.send({error:err})
        })
})

app.get("/admin/getPatientData", (req,res) => {
    console.log("Get request received")
    PatientModel.find({})
        .select("name gender contact")
        .exec() 
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            res.send({error:err})
        })
})

app.get("/admin/getDoctorData", (req,res) => {
    console.log("Get request received")
    DoctorModel.find({})
        .select("name gender contact")
        .exec() 
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            res.send({error:err})
        })
})

app.get("/admin/getMedicalRecords", (req,res) => {
    console.log("Get request received")
    MedicalRecordModel.find({})
        .select("patient_name")
        .exec() 
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            res.send({error:err})
        })
})

app.post("/admin/assignRoom", (req,res) => {
    console.log("assign room request")
    console.log(req.body)
    RoomDetailsModel
        .create(req.body)
        .then(() => {
            console.log("saved to db")
            res.send({status:"success", msg:"room assigned"})
        })
        .catch((err) => {
            console.log("failed to save", err)
            res.send({status:"failed", msg:"could not assign room"})
        })
})

app.post("/doctor/createMedicalRecord", (req,res) => {
    console.log("assign room request")
    MedicalRecordModel
        .create(req.body)
        .then(() => {
            console.log("saved to db")
            res.send({status:"success", msg:"room assigned"})
        })
        .catch((err) => {
            console.log("failed to save", err)
            res.send({status:"failed", msg:"could not assign room"})
        })
})

app.post("/doctor/updateAppointmentNotes", (req, res) => {
    AppointmentModel
        .findOneAndUpdate({doctor_name:req.body.doctor_name, patient_name:req.body.patient_name}, {appointment_notes: req.body.appointment_notes})
        .then(() => {
            console.log("Notes added")
            res.send({status:"success", msg:"notes added"})
        })
        .catch((err) => {
            console.log("no valid appointment", err)
            res.send({status:"failed", msg:"no valid appointment "})
        })
})

app.post("/doctor/dischargePatient", (req,res) => {
    console.log("discharge patient request")

    MedicalRecordModel 
        .findOneAndUpdate({patient_name:req.body.patientname}, {patient_status:"Discharge"})
        .then(() => {
            console.log("Patient discharged")
            res.send({status:"success", msg:"patient discharged"})
        })
        .catch((err) => {
            console.log("failed to update status", err)
            res.send({status:"failed", msg:"could not update patient status"})
        })
})

app.post("/doctor/searchPatient", (req,res) => {
    console.log("search req recieved")
    PatientModel.findOne({name:req.body.name})
        .then(async user => {
            if(user){
                res.send({status:"success", name:user.name, age:user.age, gender:user.gender, contact:user.contact})
            } else {
                res.send({status:"error", msg:"patient name does not exist"})
            }
        })
})

app.post("/patient/bookAppointment", (req,res) => {
    console.log("appontment request received")
    const appointment = {
        doctor_name: req.body.doctor_name, 
        patient_name: req.body.patient_name, 
        appointment_notes: null 
    }

    AppointmentModel
        .create(appointment)
        .then(() => {
            console.log("appointment scheduled")
            res.send({status:"success", msg:"appointment scheduled"})
        })
        .catch((err) => {
            console.log("failed to schedule appointment", err)
            res.send({status:"failed", msg:"failed to schedule appointment"})
        })
})

app.post("/patient/leaveRating", (req, res) => {
    RatingModel
        .create(req.body)
        .then(() => {
            console.log("rating saved to db")
            res.send({status:"success", msg:"rating saved"})
        })
        .catch((err) => {
            console.log("failed to save rating", err)
            res.send({status:"failed", msg:"failed to save rating"})
        })
})

app.post("/patient/getBill", (req,res) => {
    console.log("hospital bill request received")
    console.log(req.body.patient_name)
    HospitalBillModel
        .findOne({patient_name: req.body.patient_name})
        .then(user => {
            if(user){
                res.send({status:"success", bill_amount:user.bill_amount})
            } else {
                res.send({status:"failed"})
            }

        })
})




  