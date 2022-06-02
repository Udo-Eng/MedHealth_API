const Doctor = require('../Models/Doctor.js');

exports.createDoctor = async (doctorData) => {

    //  Create a new Patient 
    let newDoctor = new Doctor(doctorData);

    // Save the Patient to the database 
    let doctor = await newDoctor.save();

    return doctor;

}


exports.getDoctor = async () => {
    try {
        let doctors = Doctor.find();

        if (doctors) {
            return patients;
        }
    } catch (err) {
        return { sucess: false, message: ' Error getting doctors please try again later' };
    }

}



exports.getDoctor = async (id) => {
    try {
        let doctor = Doctor.findById(id);

        if (doctor) {
            return doctor;
        } else {
            return {sucess: false, message: 'No Doctor record found'}
        }
    } catch (err) {
        return { sucess: false, message: ' Error getting doctor info please try again later ' };
    }

}

exports.updateDoctor = async (id,doctor) => {

    let options = {
        new: true,                       // return updated doc
        runValidators: true              // validate before update
    }

    let updatedDoctor = Doctor.findOneAndUpdate({ _id: id },doctor, options)
        .then(patient => {
            return patient;
        })
        .catch(err => {
            return { sucess: false, message: ' Error updating doctor info please try again later'};
        })

    return updatedDoctor;
}



exports.deleteDoctor = async (id) => {

let doctor = await Doctor.findOneAndDelete({ _id: id });

  

    let responseObject;

    if (doctor) {

        let doctors = await Doctor.find();

        responseObject = { sucess: true, message: "doctor's data was deleted sucessfully", doctors: doctors };

        return responseObject;
    } else {
        responseObject = { sucess: false, message: "doctor's  data was not deleted" };
        return responseObject;
    }

}