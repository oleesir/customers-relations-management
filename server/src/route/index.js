import { Router } from 'express';
import Authroute from './Auth.route';
import Customersroute from './Customers.route';
import Notificationroute from './Notification.route';

const router = Router();

router.use('/auth', Authroute);
router.use('/customers', Customersroute);
router.use('/notifications', Notificationroute);

export default router;
