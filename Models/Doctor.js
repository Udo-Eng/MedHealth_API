const mongoose = require('mongoose');


const DoctorSchema = new mongoose.Schema({
    firstName:String,
    lastName: String,
    middleName: String,
    email: String,
    phoneNumber: String,
    ID: String,
    specializtion:String
})


const Doctor = mongoose.model("Doctor",DoctorSchema);


module.exports = Doctor;