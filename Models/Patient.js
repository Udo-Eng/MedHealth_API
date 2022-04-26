// importing mongoose and creating the patient schema 
const mongoose = require('mongoose');

let PatientSchema = new mongoose.Schema({
    hospital: String,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    maritalStatus: String,
    dob:{type: Date , default: Date.now},
    age: Number,
    email: String,
    phoneNumber: String,
    nationality: String,
    stateOfOrigin: String,
    resdentialAddress: String,
    kinFirstName: String,
    kinLastName: String,
    kinRelationship: String,
    kinPhoneNumber:String,
    kinResidentialAddress:String,
})


PatientSchema.methods.findByName = function findByName(name) {

return this.find({firstName: name});

}

const Patient = mongoose.model('Patient', PatientSchema );

module.exports = Patient;


