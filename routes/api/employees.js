const express = require('express');
const router = express.Router();
const path = require('path')
const employeesController = require('../../controllers/employeesController')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createEmployee)
    

router.route('/:id')
    .get(employeesController.getEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

module.exports = router;