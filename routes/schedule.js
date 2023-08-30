import express from 'express';
import { toggleDone, cheer } from './controllers/schedule.js';

const router = express.Router();

router.put('/done/:id', toggleDone);
router.put('/cheer/:id', cheer);

export default router;
