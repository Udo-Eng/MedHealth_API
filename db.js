// Working with mongoose to interact with mongodb 
const mongoose = require('mongoose');
const Admin = require('./Models/Admin.js');
const Patient = require('./Models/Patient.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;





// Function to connect to database 
    main().catch(err => console.log(err.message));

    async function main() {
        // Connect to database 
       let connection =  await mongoose.connect('mongodb://localhost:27017/MedHealth');
    }



exports.createAdmin = async (adminData) => {
    let newAdmin;

    // use bcrypt to hash the password 
    let {firstName,lastName,email,password} = adminData;

  await bcrypt.hash(password,saltRounds).then(async (hash) => {
        //  Create a new  admin 
         let securedAdmin = {
             firstName, lastName, email,hash
         }

        let admin = new Admin(securedAdmin);

        // Save the Admin to the database 
         newAdmin = await admin.save();


    }).catch((err) =>{
        console.error(err.message);
    })
   

    if(newAdmin){
         return newAdmin;
    }

}


exports.logInAdmin = async (LogInData) => {
  

    // use bcrypt to compare the password 
    let {  email, password } = LogInData;
    let LogInAdmin;

    // Retrieve the hash from the database
    let databaseAdmin = await Admin.find({email});
    let hash = '';

    // Checking the value of Database Admin
    console.log(databaseaAdmin,"Inside Login Admin ");
    if(databaseAdmin.length){
       hash = databaseAdmin[0].hash;
    }else{
        return { sucess: false, message: 'Please enter the right email and password combination' }
    }

 bcrypt.compare(password,hash,async (result) => {
     
        if(result){
            LogInAdmin = await  Admin.find({email});
        }
    })

   if(LogInAdmin){
       return { sucess: true, admin: LogInAdmin};
   }else{
       return { sucess: false, message: 'invalid password Please try again ' };
   }

}


exports.createPatient = async (patientData) => {
    try {


        //  Create a new Patient 
        let newPatient = new Patient(patientData);

        // Save the Patient to the database 
        let patient = await newPatient.save();


        return patient;

    } catch (err) {
        return { sucess: false, message: ' Error occured while adding patient ' };
    }

}


exports.getPatients = async () => {
    try {
        let patients = Patient.find();

        if (patients) {
            return patients;
        }
    } catch (err) {
        return { sucess: false, message: ' Error getting patients  please try again later ' };
    }

}



exports.getPatient = async (id) => {
    try {
        let patient = Patient.findById(id);

        if (patient) {
            return patient;
        } else {
            return { sucess: false, message: 'No patient record found ' }
        }
    } catch (err) {
        return { sucess: false, message: ' Error getting patient please try again later ' };
    }

}

exports.updatePatient = async (id, patient) => {

    let options = {
        new: true,                       // return updated doc
        runValidators: true              // validate before update
    }

    let updatedPatient = Patient.findOneAndUpdate({ _id: id }, patient, options)
        .then(patient => {
            return patient;
        })
        .catch(err => {
            console.error(err)
        })

    return updatedPatient;
}



exports.deletePatient = async (id) => {

    let patient = await Patient.findOneAndDelete({ _id: id });

    let responseObject;

    if (patient) {

        responseObject = { sucess: true, message: 'patient data was deleted sucessfully' };

        return responseObject;
    }else{
        responseObject = { sucess: false, message: 'patient data was not deleted' };

        return responseObject;
    }

}







