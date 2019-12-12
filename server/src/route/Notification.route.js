import { Router } from 'express';
import NotificationController from '../controllers/notification.controllers';
import Validation from '../middleware/Validation.middlewares';
import Authorization from '../middleware/Authorization.middlewares';
import asyncErrorHandler from '../middleware/asyncErrorHandler';

const router = Router();

const { verifyToken } = Authorization;
const { sendEmailToGroup } = NotificationController;
const { validateCreateEmail } = Validation;

router.post('/email', verifyToken, validateCreateEmail, asyncErrorHandler(sendEmailToGroup));

export default router;
