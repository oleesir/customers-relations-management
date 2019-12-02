import { Router } from 'express';

import Validation from '../middleware/Validation.middlewares';
import CustomerController from '../controllers/customers.controllers';
import Authorization from '../middleware/Authorization.middlewares';
import asyncErrorHandler from '../middleware/asyncErrorHandler';

const router = Router();

const { verifyToken, authorizeRoles } = Authorization;
const { createCustomer, getSingleCustomer } = CustomerController;
const { validateCreateCustomer, validateGetCustomer } = Validation;

router.post('/', verifyToken,
  authorizeRoles(['staff']),
  validateCreateCustomer,
  asyncErrorHandler(createCustomer));

router.get('/:id', verifyToken,
  validateGetCustomer,
  asyncErrorHandler(getSingleCustomer));

export default router;
