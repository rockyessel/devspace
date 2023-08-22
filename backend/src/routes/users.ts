import express from 'express';
import {
  register,
  verify,
  refreshToken,
  logout,
  getUserByField,
} from '../controllers/users';

const router = express.Router();

// login route
router.post('/', register);
router.post('/verify', verify);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.get('/field', getUserByField)

export = router;
