import { Router } from 'express';
import Validation from '../middleware/Validation.middlewares';
import AuthController from '../controllers/auth.controllers';

const router = Router();

const { signup } = AuthController;
const { validateSignup } = Validation;


router.post('/signup', validateSignup, signup);

export default router;
