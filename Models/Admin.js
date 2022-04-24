// importing mongoose and creating the Admin schema 
const mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    hash: String,
})


let Admin = mongoose.model('Admin',AdminSchema);


module.exports = Admin;