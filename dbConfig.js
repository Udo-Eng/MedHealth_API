// Working with mongoose to interact with mongodb 
const mongoose = require('mongoose');
const {connectionString} = require('./database.config.json');


// Local connection string 
// 'mongodb://localhost:27017/MedHealth'

// Function to connect to database 
    main().then(()=>{
        console.log('Server connected to database sucessfully')
    }).catch(err => console.log(err.message));

    async function main() {
    // Connect to database 
     await mongoose.connect(connectionString);
    }





