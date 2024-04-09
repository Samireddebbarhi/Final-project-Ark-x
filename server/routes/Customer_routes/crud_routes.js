const express = require('express');
const crudRouter = express.Router();
const Crud = require('../../controllers/CustomerData/Customer_CRUD');
const { verifyJwtAdmin } = require('../../middlewares/verifyJwt');
const { verifyJwtCustomer } = require('../../middlewares/verifyJwtCus');

crudRouter.use(verifyJwtAdmin)

crudRouter.use(express.json());

crudRouter.get('/customers',  Crud.getAllCustomers);
crudRouter.get('/customers/:id',  Crud.getById);
crudRouter.delete('/customers/:id',  Crud.deleteById);


module.exports = crudRouter