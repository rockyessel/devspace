import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/users';

const router = express.Router();

// login route
router.post('/', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

export = router;
