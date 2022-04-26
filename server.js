const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');


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


// Route to create a new admin
app.post("/admin/register", controllers.createAdmin);


// Route to Login admin 
app.post("/admin/login", controllers.logInAdmin);


// Route to get all Patients from the DataBase 
app.get("/patients", controllers.getPatients);


// Route to get all Patients from the DataBase 
app.get("/patient/:patientId", controllers.getPatient);


// Route to create a new Patient
app.post("/patient/add", controllers.createPatient);

// Route to  update Patient Data 
app.post("/patient/update/:patientId", controllers.updatePatient);


// Route to  delete  Patient
app.post("/patient/delete/:patientId", controllers.deletePatient);

    
// Specify the port for the server 
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})