import React from 'react'
import {Link} from 'react-router';

export const Banner = () => {
  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            MERN Authentication
          </h1>
          <p className='text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and Tailwind CSS
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              to='/login'
              className='px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:scale-105 font-semibold text-lg shadow-lg'
            >
              Sign In
            </Link>
            <Link
              to='/register'
              className='px-10 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 font-semibold text-lg shadow-lg'
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
