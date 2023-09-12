import express from 'express';
import { getAll, getTrackerByTag } from './controllers/tag.js';

const router = express.Router();

router.get('/', getAll);
router.post('/:tag', getTrackerByTag);

export default router;
