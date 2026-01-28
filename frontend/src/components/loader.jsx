import React from 'react'

export const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='relative'>
        <div className='w-24 h-24 border-8 border-gray-200 rounded-full'></div>
        <div className='w-24 h-24 border-8 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0'></div>
      </div>
    </div>
  )
}
