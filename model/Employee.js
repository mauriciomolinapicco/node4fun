const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    //object id is created automatically
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
/*That 'Employee' is the model name. Mongoose automatically looks for 
the plural and lower case name. In this case -> 'employees' */