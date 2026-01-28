import express from 'express';
import {authUser, getUserProfile, logoutUser, registerUser, updateUserProfile} from '../controllers/user.controllers.js';
import {protect} from '../middleware/auth.middleware.js';

export const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)
router.post('/logout', logoutUser)
router.route('/profile')
      .get(protect, getUserProfile)
      .put(protect, updateUserProfile)