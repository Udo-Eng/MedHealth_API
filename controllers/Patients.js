const db = require('../Models/Patient.js');


// Controller to create a new Patient 
exports.createPatient = async (req, res) => {
    try {
        let patientData = req.body;

        let newPatient = await db.createPatient(patientData);

        if (newPatient) {
            return res.json({ sucess: true, patient: newPatient });
        }

    } catch (err) {
        res.json({ sucess: false, message: 'Patient was not created' });
    }

}


//controller to get patients data
exports.getPatients = async (req, res) => {

    let patients = await db.getPatients();

    if (patients) {

        return res.json({ sucess: true, patients: patients });
    }

}



//controller to get  patient's data 
exports.getPatient = async (req, res) => {

    let id = req.params.patientId;

    let patient = await db.getPatient(id);

    if (patient) {
        return res.json({ sucess: true, patient: patient });
    }
}



//controller to update  patient  data 
exports.updatePatient = async (req, res) => {

    try {
        let updatedPatient = req.body;

        let patientId = req.params.patientId;

        let patient = await db.updatePatient(patientId, updatedPatient);

        if (patient) {
            res.json({ sucess: true, message: 'Patient was updated sucessfully ', patient: patient });
        }
    } catch (err) {
        res.json({ sucess: false, message: "The patient was not updated sucessfully" });
    }

}



//Controller to delete  patient  data 
exports.deletePatient = async (req, res) => {
    try {
        let patientId = req.params.patientId;

        let responseObject = await db.deletePatient(patientId);

        if (responseObject) {
            res.json(responseObject);
        }
    } catch (err) {
        res.json({ sucess: false, message: "The patient was not deleted sucessfully" })
    }
}