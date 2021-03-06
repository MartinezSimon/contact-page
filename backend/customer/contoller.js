const Customer = require('./model');
const Validation = require('../ValidationService');
const HTTP_STATUS = require('../config/httpcodes.config');
const sql = require("../db");

//Create a customer object
const customerObj = new Customer();

//Create and save a new customer
function create(req, res) {
    //Validate request
    if (!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).send({
            message: "Content can not be empty!"
        });
    }
    //Parse data out from request body
    let data = {
        "email": req.body.email,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "ahvNumber": req.body.ahvNumber,
        "password": req.body.password,
        "confirmPassword": req.body.confirmPassword,
        "username": req.body.username,
        "phoneNumber": req.body.phoneNumber,
        "registered": (new Date()),
    }

    console.log('Following data parsed from body ...');
    console.log(data);

    let result = Validation.validateContact(data);
    if (result.isNotValid) {
        res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(result.msg);
    } else {
        // delete field confirmPassword because it isn't relevant for database
        delete data.confirmPassword;
        //save customer into database table
        customerObj.create(data, (err, result) => {
            if (err) {
                // return error message if error occurs during customer creation
                res.status(HTTP_STATUS.SERVER_ERROR).send({
                    message: err.message || "Some error occurred while creating a new customer."
                })
            } else {
                res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(result);
                //or
                //res.status(201).send(`New Contact from ${data.email} has been inserted!`);
            }
        })
    }
}

// return all customers in database
function findAll(req, res) {
    customerObj.getAll((err, result) => {
        if (err) {
            res.status(HTTP_STATUS.SERVER_ERROR).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        } else {
            res.send(result);
        }
    })
}


// Update a Customer identified by the customerId in the request
function update(req, res) {
    //Validate request
    if (!req.body) {
        res.status(HTTP_STATUS.BAD_REQUEST).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);

    customerObj.updateById(req.params.id, req.body, (err, result) => {
        if (err) {
            // If customer was not found by id return error message
            if (err.kind === "not_found") {
                res.status(HTTP_STATUS.NOT_FOUND).send({
                    message: `Not found customer with id ${req.params.id}.`
                });
            } else {
                // Return server error if errors occurred during update
                res.status(HTTP_STATUS.SERVER_ERROR).send({
                    message: `Error updating customer with id ${req.params.id}.`
                })
            }
        } else res.send(result);
    })
}

// delete customer by id
function deleteCustomer(req, res) {
    customerObj.deleteById(req.params.id, (err, result) => {
        if (err) {
            // If customer was not found by id return error message
            if (err.kind === "not_found") {
                res.status(HTTP_STATUS.NOT_FOUND).send({
                    message: `Not found customer with id ${req.params.id}.`
                });
            } else {
                // Return server error if errors occurred during deletion
                res.status(HTTP_STATUS.SERVER_ERROR).send({
                    message: `Error deleting customer with id ${req.params.id}.`
                })
            }
        } else res.send(result);
    });
}


module.exports = {
    create,
    findAll,
    update,
    deleteCustomer
}
