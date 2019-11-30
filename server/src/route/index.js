import { Router } from 'express';
import Authroute from './Auth.route';
import Customersroute from './Customers.route';

const router = Router();

router.use('/auth', Authroute);
router.use('/customers', Customersroute);


export default router;
