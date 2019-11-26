import { Router } from 'express';
import Authroute from './Auth.route';

const router = Router();

router.use('/auth', Authroute);


export default router;
