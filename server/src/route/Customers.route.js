import { Router } from 'express';

import Validation from '../middleware/Validation.middlewares';
import CustomerController from '../controllers/customers.controllers';
import Authorization from '../middleware/Authorization.middlewares';
import asyncErrorHandler from '../middleware/asyncErrorHandler';

const router = Router();

const { verifyToken, authorizeRoles } = Authorization;
const {
  createCustomer, getSingleCustomer, getAllCustomers, deleteCustomer, updateCustomers
} = CustomerController;
const {
  validateCreateCustomer, validateGetCustomer, validateDeleteCustomer, validateUpdateCustomer
} = Validation;

router.post('/', verifyToken,
  authorizeRoles(['staff']),
  validateCreateCustomer,
  asyncErrorHandler(createCustomer));

router.get('/:id', verifyToken,
  validateGetCustomer,
  asyncErrorHandler(getSingleCustomer));

router.get('/',
  verifyToken,
  asyncErrorHandler(getAllCustomers));

router.delete('/:id',
  verifyToken,
  validateDeleteCustomer,
  asyncErrorHandler(deleteCustomer));

router.patch('/:id',
  verifyToken,
  validateUpdateCustomer,
  asyncErrorHandler(updateCustomers));

export default router;
