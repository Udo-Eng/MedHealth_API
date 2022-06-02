const express = require('express');
const cors = require('cors');
const adminController = require('./controllers/Admin.js');
const patientController = require('./controllers/Patients.js');
const doctorController = require('./controllers/Doctors.js');


// initializing  the express server application 
const app = express();

// Middleware to allow cross-origin resource sharing by setting the same origin policy in browsers
app.use(cors());


//Adding an express middleware to handle json 
app.use(express.json());

//Adding midleware to handle form submission 
app.use(express.urlencoded({
    extended: false
}));


//connect to the database
require('./dbConfig.js');

// Route to create a new admin
app.post("/admin/register", adminController.createAdmin);


// Route to Login admin 
app.post("/admin/login", adminController.logInAdmin);






// Route to get all Patients from the DataBase 
app.get("/patients", patientController.getPatients);


// Route to get all Patients from the DataBase 
app.get("/patient/:patientId", patientController.getPatient);


// Route to create a new Patient
app.post("/patient/add", patientController.createPatient);

// Route to  update Patient Data 
app.post("/patient/update/:patientId", patientController.updatePatient);


// Route to  delete  Patient
app.post("/patient/delete/:patientId", patientController.deletePatient);





// Route to get all Patients from the DataBase 
app.get("/doctors", doctorController.getDoctors);


// Route to get all Patients from the DataBase 
app.get("/doctor/:doctorId", doctorController.getDoctor);


// Route to create a new Patient
app.post("/doctor/add", doctorController.createDoctor);

// Route to  update Patient Data 
app.post("/doctor/update/:doctorId", doctorController.updateDoctor);


// Route to  delete  Patient
app.post("/doctor/delete/:doctorId", doctorController.deleteDoctor);

    
// Specify the port for the server 
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})