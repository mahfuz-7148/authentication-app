import asyncHandler from 'express-async-handler';
import {User} from '../models/user.model.js';
import {generateToken} from '../utils/generate.token.js';

export const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body
  const userExists = await User.findOne({email})
  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }
  const user = await User.create({
    name, email, password
  })
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('invalid user')
  }
})

export const loginUser =  asyncHandler(async (req, res) => {
 const {email, password} = req.body
  const user = await User.findOne({email})
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  }
  else {
    res.status(401)
    throw new Error('invalid email or password')
  }
})

export const logoutUser = asyncHandler(async (req, res) => {
 res.clearCookie('jwtToken', {
   httpOnly: true,
   secure: true,
   sameSite: 'none',
   path: '/'
 })
  res.status(200).json({message: 'logout successfully'})
})

export const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json({user})
})

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const {currentPassword, name, email} = req.body
    if (!currentPassword) {
      res.status(400)
      throw new Error('current password is required')
    }
    const isMatch = await user.matchPassword(currentPassword)
    if (!isMatch) {
      res.status(401)
      throw new Error('current password is incorrect')
    }

    user.name = name || user.name
    user.email = email || user.email

    const saveUser = await user.save()
    res.status(200).json({
      _id: saveUser._id,
      name: saveUser.name,
      email: saveUser.email
    })
  }
  else {
    res.status(404)
    throw new Error('user not found')
  }
})

export const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const {currentPassword, newPassword} = req.body
    if (!currentPassword || !newPassword) {
      res.status(400)
      throw new Error('please provide both current and new password')
    }
    const isMatch = await user.matchPassword(currentPassword)
    if (!isMatch) {
      res.status(401)
      throw new Error('current password is incorrect')
    }

    if (newPassword.length < 6) {
      res.status(400)
      throw new Error('password must be at least 6')
    }

    user.password = newPassword
    await user.save()
    res.status(200).json({
     message: 'password updated successfully'
    })
  }
  else {
    res.status(404)
    throw new Error('user not found')
  }
})