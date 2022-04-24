const  db = require('./db.js');


// Controller to create a new  Admin
exports.createAdmin = async (req, res) => {
    try {
        let AdminData = req.body;

        let newAdmin = await db.createAdmin(AdminData);

        if (newAdmin) {

            return res.json({ sucess: true, admin:newAdmin });
        }

    } catch (err) {
        res.json({ sucess: false, message: 'Admin  was not created please try again later' })
    }

}


// Controller to LogIn Admin  
exports.logInAdmin = async (req, res) => {
    try {
        let LogInData = req.body;

        let 

        return res.json({ sucess: true, admin: LogInData });
        // }

    } catch (err) {
        res.json({ sucess: false, message: 'Login was unsucessful please try again later ' });
    }

}


// Controller to create a new Patient 
exports.createPatient = async (req, res) => {
try{
 let patientData  = req.body;

    let newPatient =  await db.createPatient(patientData);

    if (newPatient) {
       
         return res.json({ sucess: true, patient: newPatient });
    }

    }catch(err){
        res.json({sucess : false ,message: 'Patient was not created'}) 
    }
   
}

//Controller to get patients data
exports.getPatients = async (req, res) => {

    let patients = await db.getPatients();

    if (patients) {

        return res.json({ sucess: true, patients: patients });
    }

}



//Controller to get  patient's data 
exports.getPatient = async (req, res) => {

    let id = req.params.patientId;

    let patient = await db.getPatient(id);

    if (patient) {
        return res.json({ sucess: true, patient: patient });
    }
}



//Controller to update  patient  data 
exports.updatePatient = async (req,res) => {


    let   updatedPatient  = req.body;
 
    let  patientId =  req.params.patientId;


    let patient = await db.updatePatient(patientId,updatedPatient);

    if (patient) {
    
        res.json({ sucess: true, message: 'Patient was updated sucessfully ', patient: patient });
    }

}



//Controller to delete  patient's data 
exports.deletePatient = async (req,res) => {

    let patientId = req.params.patientId;

    let responseObject  = await db.deletePatient(patientId);

    if (responseObject) {
        res.json(responseObject);
    }

}
