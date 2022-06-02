const  db = require('../db/Admin.js');


// Controller to create a new  Admin
exports.createAdmin = async (req, res) => {
    try {
        let AdminData = req.body;

        let newAdmin = await db.createAdmin(AdminData);

        if (newAdmin) {

            return res.json({ sucess: true, admin: newAdmin });
        }

    } catch (err) {
        res.json({ sucess: false, message: 'Admin  was not created please try again later' })
    }

}


// Controller to LogIn Admin  
exports.logInAdmin = async (req, res) => {
    try {

        // Rename the  request body 
        let LogInData = req.body;

        let result = await db.logInAdmin(LogInData);


        return res.json(result);

    } catch (err) {

        res.json({ sucess: false, message: 'Login was unsucessful please try again later' });
    }

}


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

