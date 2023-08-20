import express from 'express';
import {
  create_broadcast,
  join_broadcast,
  chat_history,
} from '../controllers/broadcast';
import { Protection } from '../middleware/authentication';

const router = express.Router();

router.post('/', Protection, create_broadcast);
router.post('/:room_id/join', Protection, join_broadcast);
router.get('/:room_id/chat-history', Protection, chat_history);

export = router;
