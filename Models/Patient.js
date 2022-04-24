// importing mongoose and creating the patient schema 
const mongoose = require('mongoose');

let PatientSchema = new mongoose.Schema({
    hospital: String,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    maritalStatus: String,
    DOB:{type: Date , default: Date.now},
    age: Number,
    email: String,
    phonNumber: Number,
    nationality: String,
    stateOfOrigin: String,
    resdentialAddress: String,
    kinFirstName: String,
    kinLastName: String,
    kinRelationship: String,
    kinPhoneNumber:Number,
    kinResidentialAddress:Number,
})


PatientSchema.methods.findByName = function findByName(name) {

return this.find({firstName: name});

}

const Patient = mongoose.model('Patient', PatientSchema );

module.exports = Patient;


