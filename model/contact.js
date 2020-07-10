const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({            //creating schema
    name : 
    {
        type : String,              //defining field
        required : true,
    },
    phone:
    {
        type : String,
        required : true,
    }
});

const Contact = mongoose.model('Contact',contactSchema);       //creating model
module.exports = Contact;               //exporting model