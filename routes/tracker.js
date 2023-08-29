import express from 'express';
import { create, getList, getTracker, remove } from './controllers/tracker.js';

const router = express.Router();

router.post('/new', create);
router.get('/list/:page', getList);
router.get('/:id', getTracker);
router.put('/:id/remove', remove);

export default router;
