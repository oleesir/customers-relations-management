import { Router } from 'express';

import Validation from '../middleware/Validation.middlewares';
import CustomerController from '../controllers/customers.controllers';
import Authorization from '../middleware/Authorization.middlewares';
import asyncErrorHandler from '../middleware/asyncErrorHandler';

const router = Router();

const { verifyToken, authorizeRoles } = Authorization;
const { createCustomer } = CustomerController;
const { validateCreateCustomer } = Validation;

router.post('/', verifyToken,
  authorizeRoles(['staff']),
  validateCreateCustomer,
  asyncErrorHandler(createCustomer));

export default router;
