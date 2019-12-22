import { Router } from 'express';
import NotificationController from '../controllers/notification.controllers';
import Validation from '../middleware/Validation.middlewares';
import Authorization from '../middleware/Authorization.middlewares';
import asyncErrorHandler from '../middleware/asyncErrorHandler';

const router = Router();

const { verifyToken } = Authorization;
const { sendEmailToGroup, sendScheduleEmailToGroup, sendSmsToCustomer } = NotificationController;
const { validateCreateEmail, validateAutomatedCreateEmail, validateCreateSms } = Validation;

router.post('/email', verifyToken, validateCreateEmail, asyncErrorHandler(sendEmailToGroup));
router.post('/autoEmail', verifyToken, validateAutomatedCreateEmail, asyncErrorHandler(sendScheduleEmailToGroup));
router.post('/sms', verifyToken, validateCreateSms, asyncErrorHandler(sendSmsToCustomer));

export default router;
