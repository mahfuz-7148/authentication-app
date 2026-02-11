import React, {useEffect, useState} from 'react'
import {FormContainer} from '../components/form.container.jsx';
import {useRegisterMutation} from '../slices/users.api.slice.js';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router';
import {Loader} from '../components/loader.jsx';
import {setCredentials} from '../slices/auth.slice.js';

export const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [register, {isLoading}] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('password dont match')
    }
    else {
      try {
        const res = await register({name, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('registration successful')
        navigate('/');
      }
      catch (err) {
        toast.error('register error')
      }
    }
  }
  return (
    <FormContainer>
      <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Register</h1>

      <form onSubmit={submitHandler}>
        {/* Name Field */}
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-semibold mb-2'>
            Name
          </label>
          <input
            type='text'
            id='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Email Field */}
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Password Field */}
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className='mb-6'>
          <label htmlFor='confirmPassword' className='block text-gray-700 font-semibold mb-2'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type='submit'
          className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {/* Loader */}
        {isLoading && (
          <div className='mt-4'>
            <Loader />
          </div>
        )}
      </form>

      {/* Login Link */}
      <div className='py-4 text-center'>
        <span className='text-gray-600'>Already have an account? </span>
        <Link to='/login' className='text-blue-600 hover:text-blue-700 font-semibold'>
          Login
        </Link>
      </div>
    </FormContainer>
  )
}
