const mongoose = require('mongoose');           //require library   
mongoose.connect('mongodb://localhost/Contact_list_DB');        //connect to DB

const db = mongoose.connection;                 //acquire connection to check connection status

db.on('error',console.error.bind(console,'Connection error with database'));  //if error then error
db.once('open',function()                               //if no error then success msg
{
    console.log("Connection Established with database");
});