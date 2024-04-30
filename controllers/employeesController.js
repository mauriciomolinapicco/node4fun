const data = {
    employees: require('../model/employees.json'),//i would replace with mongoDB
    setEmployees: function (data) {this.employees = data}
}
/* SAME THING
const data = {}; //empty object
data.employess = require('../model/employees.json') 
*/

const getAllEmployees = (req,res) => {
    res.json(data.employees);
};

const getEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if (!employee){
        return res.status(400).json({'message':`Employee with id ${req.params.id} not found`})
    }
    res.json(employee);
}

const createEmployee = (req,res) => {
    const newEmployee = {
        id: data.employees[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    if(!newEmployee.firstname || !newEmployee.lastname){
        res.status(400).json({'message':'First and last name required'})
    };

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees)
};

const updateEmployee = (req,res) => {
    
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if(!employee){
        res.status(400).json({'message':`Could not find employee with id ${req.params.id}`})
    }
    if (req.body.lastname) employee.lastname = req.body.lastname;
    if (req.body.firstname) employee.firstname = req.body.firstname;

    //get array without the employee 
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.params.id))
    const unsortedArray = [...filteredArray, employee] //Add updated employee
    data.setEmployees(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}


const deleteEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee){
        return res.status(400).json({'message':`Employee with ID ${req.params.id} not found`})
    }

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.params.id))
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}   

module.exports = {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}