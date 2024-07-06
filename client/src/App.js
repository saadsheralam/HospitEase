import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import LandingPage from './components/landingpage';
import DoctorLogin from './components/doctorlogin';
import PatientLogin from './components/patientlogin';
import AdminLogin from './components/adminlogin';
import PatientSignup from './components/patientsignup';
import DoctorSignup from './components/doctorsignup';
import AdminHomepage from './components/adminhomepage';
import AddDoctor from './components/addDoctor';
import AddNurse from './components/addNurse';
import AssignNurseRoom from './components/assignNurseRoom';
import DoctorHomepage from './components/doctorhomepage';
import CreateMedicalRecord from './components/createmedicalrecord';
import DischargePatient from './components/dischargepatient';
import PatientHomepage from './components/patienthomepage';
import BookAppointment from './components/bookappointment';
import PatientProtected from './components/patientprotected';
import LeaveRating from './components/leaverating';
import HospitalBill from './components/viewhospitalbill';
import AppointmentNotes from './components/addappointmentnotes';
import DoctorProtected from './components/doctorprotected';
import AdminProtected from './components/adminprotected';
import SearchResults from './components/searchresults';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>

            {/* Login Routes */}
            <Route path="/doctor/login" element={<DoctorLogin/>}/>
            <Route path="/patient/login" element={<PatientLogin/>}/>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            {/* Signup Routes */}

            <Route path="/patient/signup" element={<PatientSignup/>}/>
            <Route path="/doctor/signup" element={<DoctorSignup/>}/>

            {/* Admin Routes */}
            <Route path="/admin/homepage" element={<AdminProtected Component={AdminHomepage}/>}/>
            <Route path="/admin/addDoctor" element={<AdminProtected Component={AddDoctor}/>}/>
            <Route path="/admin/addNurse" element={<AdminProtected Component={AddNurse}/>}/>
            <Route path="/admin/assign-nurse-room" element={<AdminProtected Component={AssignNurseRoom}/>}/>

            {/* Doctor Routes */}
            <Route path="/doctor/homepage" element={<DoctorProtected Component={DoctorHomepage}/>}/>
            <Route path="/doctor/search-results" element={<DoctorProtected Component={SearchResults}/>}/>
            <Route path="/doctor/create-medical-record" element={<DoctorProtected Component={CreateMedicalRecord}/>}/>
            <Route path="/doctor/discharge-patient" element={<DoctorProtected Component={DischargePatient}/>}/>
            <Route path="/doctor/add-appointment-notes" element={<DoctorProtected Component={AppointmentNotes}/>}/>

            {/* Patient Routes */}
            <Route path="/patient/homepage" element={<PatientProtected Component={PatientHomepage} />}/>
            <Route path="/patient/book-appointment" element={<PatientProtected Component={BookAppointment}/>}/>
            <Route path="/patient/leave-rating" element={<PatientProtected Component={LeaveRating}/>}/>
            <Route path="/patient/view-bill" element={<PatientProtected Component={HospitalBill}/>}/>





                             
        </Routes>
      </BrowserRouter>
    
  )
}

export default App;
