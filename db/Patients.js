const Patient = require('../Models/Patient.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createPatient = async (patientData) => {

    //  Create a new Patient 
    let newPatient = new Patient(patientData);

    // Save the Patient to the database 
    let patient = await newPatient.save();

    return patient;

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
            return { sucess: false, message: " Error updating patient's info please try again later" };
        })

    return updatedPatient;
}



exports.deletePatient = async (id) => {

    let patient = await Patient.findOneAndDelete({ _id: id });



    let responseObject;

    if (patient) {

        let patients = await Patient.find();

        responseObject = { sucess: true, message: 'patient data was deleted sucessfully', patients: patients };

        return responseObject;
    } else {
        responseObject = { sucess: false, message: 'patient data was not deleted' };

        return responseObject;
    }

}


