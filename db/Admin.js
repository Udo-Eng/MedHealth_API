const Admin = require('../Models/Admin.js');


exports.createAdmin = async (adminData) => {
    let newAdmin;

    // use bcrypt to hash the password 
    let { firstName, lastName, email, password } = adminData;

    await bcrypt.hash(password, saltRounds).then(async (hash) => {
        //  Create a new  admin 
        let securedAdmin = {
            firstName, lastName, email, hash
        }

        let admin = new Admin(securedAdmin);

        // Save the Admin to the database 
        newAdmin = await admin.save();


    }).catch((err) => {
        console.error(err.message);
    })


    if (newAdmin) {
        return newAdmin;
    }

}


exports.logInAdmin = async (LogInData) => {


    // use bcrypt to compare the password 
    let { email, password } = LogInData;


    // Retrieve the hash from the database
    let databaseAdmin = await Admin.find({ email });
    let hash = '';

    const DatabaseAdminArray = Array.from(databaseAdmin);

    if (DatabaseAdminArray.length !== 0) {
        hash = databaseAdmin[0].hash;
    } else {
        return { sucess: false, message: 'Please enter the right email and password combination' }
    }

    let LogInAdmin = await bcrypt.compare(password, hash).then(async (result) => {
        let LogInAdmin;
        if (result) {
            LogInAdmin = await Admin.find({ email });
        }
        return LogInAdmin;
    })



    if (LogInAdmin) {
        return { sucess: true, admin: LogInAdmin };
    } else {
        return { sucess: false, message: 'invalid password Please try again ' };
    }

}


