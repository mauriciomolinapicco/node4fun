const data = {
    employees: require('../model/employees.json'),//i would replace with mongoDB
    setEmployees: function (data) {this.employees = data}
}
/* SAME THING
const data = {}; //empty object
data.employess = require('../model/employees.json') 
*/

const getAllEmployees = (req,res) => {
    res.json(data.employess);
};

const getEmployee = (req,res) => {
    const newEmployee = {
        id: data.employess[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    if(!newEmployee.firstname || !newEmployee.lastname){
        res.status(400).json({'message':'First and last name required'})
    };

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees)

    res.json({"id": req.params.id});
}

const createEmployee = (req,res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
};

const updateEmployee = (req,res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

const deleteEmployee = (req,res) => {
    res.json({
        "id": req.body.id
    })
}

module.exports = {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}