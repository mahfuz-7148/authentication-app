import express from 'express';
import {getProfile, loginUser, logoutUser, registerUser, updatePassword, updateProfile} from '../controllers/user.controller.js';
import {protect} from '../middlewares/auth.middleware.js';

export const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', protect, getProfile)
router.put('/updateProfile', protect, updateProfile)
router.put('/updatePassword', protect, updatePassword)