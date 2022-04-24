// Working with mongoose to interact with mongodb 
const mongoose = require('mongoose');
const Admin = require('./Models/Admin.js');
const Patient = require('./Models/Patient.js');
const bcrypt = require('bcrypt');



main().catch(err => console.log(err.message));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}


exports.createAdmin = async (adminData) => {

    // use bcrypt to hash the password 
    let {firstName,lastName,email,password} = adminData;

   let newAdmin  =  bcrypt.hash(password, async (hash) => {
        //  Create a new  admin 
         let securedAdmin = {
             firstName, lastName, email,hash
         }

        let admin = new Admin(securedAdmin);

        // Save the Admin to the database 
        let newAdmin = await admin.save();

        return newAdmin

    })
    
    return newAdmin;

}


exports.logInAdmin = async (LogInData) => {
  

    // use bcrypt to compare the password 
    let {  email, password } = LogInData;

    let databaseAdmin = await Admin.find({email});
    let hash = '';
    if(databaseAdmin.length){
       hash = databaseAdmin[0].hash;
    }else{
        return { sucess: false, message: 'Wrong email and password combination' }
    }

    let Admin = bcrypt.compare(password,hash, async (result) =>{
        if(result){
            let admin = await  Admin.find({email});
            return {sucess: true  ,admin: admin};
        }else{
            return { sucess: false ,message: 'invalid password Please try again '};
        }
    })

    return 

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
            // Return the updated patient 
            return patient;
        })
        .catch(err => {
            console.error(err)
        })

    return updatedPatient;
}



exports.deletePatient = async (id) => {

    let patient = await Patient.findOneAndDelete({ _id: id });


    if (patient) {

        let responseObject = { sucess: true, message: 'patient data was deleted sucessfully' };

        return responseObject;
    }

}







