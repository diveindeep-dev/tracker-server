import express from 'express';
import {
  registerValidation,
  signInValidation,
  verifyToken,
} from './middlewares/authValidation.js';
import { create, getToken, getUser } from './controllers/auth.js';

const router = express.Router();

router.post('/signup', registerValidation, create);
router.post('/signin', signInValidation, getToken);
router.get('/', verifyToken, getUser);

export default router;
