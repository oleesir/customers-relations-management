import { Router } from 'express';
import Validation from '../middleware/Validation.middlewares';
import AuthController from '../controllers/auth.controllers';
import asyncErrorHandler from '../middleware/asyncErrorHandler';

const router = Router();

const { signup, signin } = AuthController;
const { validateSignup, validateSignin } = Validation;

router.post('/signup', validateSignup, asyncErrorHandler(signup));
router.post('/signin', validateSignin, asyncErrorHandler(signin));

export default router;
