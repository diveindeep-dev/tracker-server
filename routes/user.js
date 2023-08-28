import express from 'express';
import { editProfile, getUser } from './controllers/user.js';

const router = express.Router();

router.put('/edit/:user_id', editProfile);
router.post('/:profileId', getUser);

export default router;
